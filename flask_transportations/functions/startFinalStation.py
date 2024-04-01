# -*- coding: utf-8 -*-
"""
Created on Tue Aug 29 20:50:31 2023

@author: miyuki

國光客運班次查詢
target url: https://order.kingbus.com.tw/ORD/ORD_Q_1560_ViewPrice.aspx
建立起迄點查詢表到資料庫
ref: https://ithelp.ithome.com.tw/articles/10220403
"""

import requests
from bs4 import BeautifulSoup
import datetime
import pandas as pd
from selenium import webdriver #載入 webdriver 模組
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import Select
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC 
from selenium.webdriver.common.keys import Keys 
from time import sleep
import mysql.connector
import sqlite3
import json

url = "https://order.kingbus.com.tw/ORD/ORD_Q_1530_ViewSchedule.aspx"

def getStartStation():
    my_header = {"User-Agent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36"}
    
    session = requests.Session()
    resp = session.get(url,headers = my_header)
    
    startStaDict = {}
    
    if resp.status_code == 200:
        soup = BeautifulSoup(resp.text,"html.parser")
        startStationValues = soup.select("span#ctl00_ContentPlaceHolder1_udpStation_ID_From option") #startStation起站
        
        for index,startStation in enumerate(startStationValues):  
            startStaDict[startStation.text.replace("　　","").replace("\u3000","")] = startStation.get("value")
    return startStaDict


def getFinalStation():
    s = webdriver.chrome.service.Service(r'..\chromedriver.exe')
    driver=webdriver.Chrome(service=s) #建立瀏覽器物件
    driver.get(url) 
    
    outList = [[]*i for i in range(len(startStaDict))]
    
    for index,key in enumerate(startStaDict):
        Select(driver.find_element(By.ID, "ctl00_ContentPlaceHolder1_DDL_StarSation")).select_by_value(startStaDict[key])
        sleep(0.2)
        
        finalStation = Select(driver.find_element(By.NAME, 'ctl00$ContentPlaceHolder1$DDL_EndSation'))
        soup = BeautifulSoup(driver.page_source,"html.parser")
        
        startValue = soup.select_one("select#ctl00_ContentPlaceHolder1_DDL_StarSation").find("option",selected="selected")
        outDict = {}
        outDict["startName"] = startValue.text.replace("　　","").replace("\u3000","")
        outDict["startValue"] = startValue.get("value")
        outDict["end"] = []
        
        finalValues = soup.select("select#ctl00_ContentPlaceHolder1_DDL_EndSation option")
        
        for fv in finalValues:
            finalDict = {}
            finalDict["finalName"] = fv.text.replace("　　","").replace("\u3000","")
            finalDict["finalValue"] = fv.get("value")
            outDict["end"].append(finalDict)
        outList[index].append(outDict)    

    driver.quit() # 關閉chromedriver.exe
    
    #ref: https://blog.csdn.net/baidu_36499789/article/details/121371587
    with open('startFinalStation.json', 'w') as f:
        json.dump(outList, f, ensure_ascii=False)  
    
    return outList

if __name__ == "__main__":
    startStaDict = getStartStation()
    # print(startStaDict)
    getFinalStation = getFinalStation() 
    # print(getFinalStation)

