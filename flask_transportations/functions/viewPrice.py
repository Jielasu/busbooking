
from bs4 import BeautifulSoup
import pandas as pd
import requests
from selenium import webdriver #載入 webdriver 模組
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import Select
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions
from selenium.webdriver.common.keys import Keys 
from time import sleep
import threading
import sqlite3
import datetime
import re
import sqlite3

def crawlerTicket(startStaValue,finalStaValue,startStaName,finalStaName):
    url = "https://order.kingbus.com.tw/ORD/ORD_Q_1560_ViewPrice.aspx"
    s = webdriver.chrome.service.Service(r'./chromedriver.exe')
    driver=webdriver.Chrome(service=s) #建立瀏覽器物件
    driver.get(url) 
    
    startStaList = []  #起站
    finalStaList = []  #迄站
    viaStaList = [] #經由站
    carTypeList = []  #車種
    regularTicketList = [] #全票
    concessionTicketList = [] #優惠票	
     
    Select(driver.find_element(By.ID, 'ctl00_ContentPlaceHolder1_DDL_StarSation')).select_by_value(startStaValue)
    sleep(1)
    Select(driver.find_element(By.ID, 'ctl00_ContentPlaceHolder1_DDL_EndSation')).select_by_value(finalStaValue)
    sleep(0.5)
    driver.find_element(By.ID, "ctl00_ContentPlaceHolder1_btnQuery").click()
    sleep(2)
    
    soup = BeautifulSoup(driver.page_source,"html.parser")
    targets = soup.select("table#ctl00_ContentPlaceHolder1_GridView1 td")
    
    for i in range(len(targets)//9):
        for via,carType,regularTicket,concessionTicket in zip(targets[1+i*9],targets[2+i*9],targets[3+i*9],targets[5+i*9]):
            # print(rideDay.text,departureTime.text,carType.text)
            viaStaList.append(via.text.replace("　　","").replace("　",""))
            carTypeList.append(carType.text)
            regularTicketList.append(regularTicket.text)
            concessionTicketList.append(concessionTicket.text)
            startStaList.append(startStaName)
            finalStaList.append(finalStaName)
        
            
    saveData = pd.DataFrame({"起站":startStaList,"迄站":finalStaList,
                              "經由站":viaStaList,"車種":carTypeList,
                              "全票":regularTicketList,"優惠票":concessionTicketList
                              })    
    
    driver.quit() # 關閉chromedriver.exe
    return saveData



    







if __name__ == "__main__":
    saveData = crawlerTicket("U03","F14","宜蘭","梨山")


        