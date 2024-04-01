# -*- coding: utf-8 -*-
"""
Created on Tue Sep  5 17:52:12 2023

@author: miyuki
"""

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


def crawlerSchedule(startStaValue,finalStaValue,startStaName,finalStaName,rideDay):
    url = "https://order.kingbus.com.tw/ord/ord_q_1530_viewschedule.aspx"
    s = webdriver.chrome.service.Service(r'./chromedriver.exe')
    driver=webdriver.Chrome(service=s) #建立瀏覽器物件
    driver.get(url) 
    
    startStaList = []  #起站
    finalStaList = []  #迄站
    rideDayList = []  #乘車日期
    departureTimeList = []  #發車時間
    viaStaList = [] #經由站
    carTypeList = []  #車種
    
    # for day in dayList:  
    Select(driver.find_element(By.NAME, 'ctl00$ContentPlaceHolder1$DDL_StarSation')).select_by_value(startStaValue)
    sleep(1)
    Select(driver.find_element(By.NAME, 'ctl00$ContentPlaceHolder1$DDL_EndSation')).select_by_value(finalStaValue)
    
    driver.find_element(By.NAME, 'ctl00$ContentPlaceHolder1$txtS_Date1').send_keys(rideDay)
    Select(driver.find_element(By.ID, 'ctl00_ContentPlaceHolder1_Start_DT_S_Time')).select_by_value("0001")
    Select(driver.find_element(By.ID, 'ctl00_ContentPlaceHolder1_Stop_DT_S_Time')).select_by_value("2400")
    driver.find_element(By.ID, "ctl00_ContentPlaceHolder1_btnQuery").click()
    sleep(2)
    
    soup = BeautifulSoup(driver.page_source,"html.parser")
    targets = soup.select("table#ctl00_ContentPlaceHolder1_GridView1 td")
    pages = soup.find("table",id="ctl00_ContentPlaceHolder1_GridView1").find("td",colspan="2")
    # print(pages)
    
    if pages!= None:
        for i in range(eval(pages.text.split("/")[1][0])):        
            driver.find_element(By.CSS_SELECTOR, f"table#ctl00_ContentPlaceHolder1_GridView1 table > tbody > tr > td:nth-child({i+1})").click()
            #ctl00_ContentPlaceHolder1_GridView1 > tbody > tr:nth-child(12) > td:nth-child(2) > table > tbody > tr > td:nth-child(1) > span        
            #ctl00_ContentPlaceHolder1_GridView1 > tbody > tr:nth-child(12) > td:nth-child(2) > table > tbody > tr > td:nth-child(2) > a
            #ctl00_ContentPlaceHolder1_GridView1 > tbody > tr:nth-child(12) > td:nth-child(2) > table > tbody > tr > td:nth-child(3) > span
            #ctl00_ContentPlaceHolder1_GridView1 > tbody > tr:nth-child(12) > td:nth-child(2) > table > tbody > tr > td:nth-child(4) > a
            sleep(1)
            
            soup = BeautifulSoup(driver.page_source,"html.parser") 
            targets = soup.select("table#ctl00_ContentPlaceHolder1_GridView1 td")
            for i in range(len(targets)//4):
                for rideDay,departureTime,via,carType in zip(targets[0+i*4],targets[1+i*4],targets[2+i*4],targets[3+i*4]):
                    # print(rideDay.text,departureTime.text,carType.text)
                    rideDayList.append(rideDay.text)
                    departureTimeList.append(departureTime.text)
                    viaStaList.append(via.text.replace("　　","").replace("　",""))
                    carTypeList.append(carType.text)
                    startStaList.append(startStaName)
                    finalStaList.append(finalStaName)
            
            # # for rideDay,departureTime,carType in zip(targets[0],targets[1],targets[3]):
            # #     print(rideDay.text,departureTime.text,carType.text)
            # # for rideDay,departureTime,carType in zip(targets[4],targets[5],targets[7]):
            # #     print(rideDay.text,departureTime.text,carType.text)
    
    elif pages == None:
        for i in range(len(targets)//4):
            for rideDay,departureTime,via,carType in zip(targets[0+i*4],targets[1+i*4],targets[2+i*4],targets[3+i*4]):
                # print(rideDay.text,departureTime.text,carType.text)
                rideDayList.append(rideDay.text)
                departureTimeList.append(departureTime.text)
                viaStaList.append(via.text.replace("　　","").replace("　",""))
                carTypeList.append(carType.text)
                startStaList.append(startStaName)
                finalStaList.append(finalStaName)
        
        # #點擊重新班次查詢
        # driver.find_element(By.ID, "ctl00_ContentPlaceHolder1_btnClear").click() 
        # driver.find_element(By.NAME, 'ctl00$ContentPlaceHolder1$txtS_Date1').clear()

    saveData = pd.DataFrame({"起站":startStaList,"迄站":finalStaList,
                              "乘車日期":rideDayList,"發車時間":departureTimeList,
                              "經由站":viaStaList,"車種":carTypeList})    
    
    #刪除符合正則的資料列，如:乘車日期=（1/4)就刪除資料列
    for i in range(len(saveData)):  #取出saveDate筆數
        if re.match(r"（\d+/\d+", saveData["乘車日期"][i]) or re.match(r"\s\s\d+", saveData["乘車日期"][i]):  #https://docs.python.org/zh-tw/3/library/re.html
            saveData.drop(index = i, axis = 0, inplace = True) #https://blog.csdn.net/qq_18351157/article/details/105785367
    saveData.index = [i for i in range(len(saveData))] #將index重新排列    
    # saveData.to_csv("kingbusCrawler.csv",encoding="ansi")
                        
    driver.quit() # 關閉chromedriver.exe  如果放在saveDate = pd.DataFrame前會出錯，ref: https://stackoverflow.com/questions/72355506/selenium-max-retries-exceeded-with-url

    return saveData


def crawlerScheduleThread(startStaValue,finalStaValue,startStaName,finalStaName,rideDay,result, index):
    url = "https://order.kingbus.com.tw/ord/ord_q_1530_viewschedule.aspx"
    s = webdriver.chrome.service.Service(r'./chromedriver.exe')
    driver=webdriver.Chrome(service=s) #建立瀏覽器物件
    driver.get(url) 
    
    startStaList = []  #起站
    finalStaList = []  #迄站
    rideDayList = []  #乘車日期
    departureTimeList = []  #發車時間
    viaStaList = [] #經由站
    carTypeList = []  #車種
    
    # for day in dayList:  
    Select(driver.find_element(By.NAME, 'ctl00$ContentPlaceHolder1$DDL_StarSation')).select_by_value(startStaValue)
    sleep(1)
    Select(driver.find_element(By.NAME, 'ctl00$ContentPlaceHolder1$DDL_EndSation')).select_by_value(finalStaValue)
    
    driver.find_element(By.NAME, 'ctl00$ContentPlaceHolder1$txtS_Date1').send_keys(rideDay)
    Select(driver.find_element(By.ID, 'ctl00_ContentPlaceHolder1_Start_DT_S_Time')).select_by_value("0001")
    Select(driver.find_element(By.ID, 'ctl00_ContentPlaceHolder1_Stop_DT_S_Time')).select_by_value("2400")
    driver.find_element(By.ID, "ctl00_ContentPlaceHolder1_btnQuery").click()
    sleep(2)
    
    soup = BeautifulSoup(driver.page_source,"html.parser")
    targets = soup.select("table#ctl00_ContentPlaceHolder1_GridView1 td")
    pages = soup.find("table",id="ctl00_ContentPlaceHolder1_GridView1").find("td",colspan="2")
    # print(pages)
    
    if pages!= None:
        for i in range(eval(pages.text.split("/")[1][0])):        
            driver.find_element(By.CSS_SELECTOR, f"table#ctl00_ContentPlaceHolder1_GridView1 table > tbody > tr > td:nth-child({i+1})").click()
            #ctl00_ContentPlaceHolder1_GridView1 > tbody > tr:nth-child(12) > td:nth-child(2) > table > tbody > tr > td:nth-child(1) > span        
            #ctl00_ContentPlaceHolder1_GridView1 > tbody > tr:nth-child(12) > td:nth-child(2) > table > tbody > tr > td:nth-child(2) > a
            #ctl00_ContentPlaceHolder1_GridView1 > tbody > tr:nth-child(12) > td:nth-child(2) > table > tbody > tr > td:nth-child(3) > span
            #ctl00_ContentPlaceHolder1_GridView1 > tbody > tr:nth-child(12) > td:nth-child(2) > table > tbody > tr > td:nth-child(4) > a
            sleep(1)
            
            soup = BeautifulSoup(driver.page_source,"html.parser") 
            targets = soup.select("table#ctl00_ContentPlaceHolder1_GridView1 td")
            for i in range(len(targets)//4):
                for rideDay,departureTime,via,carType in zip(targets[0+i*4],targets[1+i*4],targets[2+i*4],targets[3+i*4]):
                    # print(rideDay.text,departureTime.text,carType.text)
                    rideDayList.append(rideDay.text)
                    departureTimeList.append(departureTime.text)
                    viaStaList.append(via.text.replace("　　","").replace("　",""))
                    carTypeList.append(carType.text)
                    startStaList.append(startStaName)
                    finalStaList.append(finalStaName)
            
            # # for rideDay,departureTime,carType in zip(targets[0],targets[1],targets[3]):
            # #     print(rideDay.text,departureTime.text,carType.text)
            # # for rideDay,departureTime,carType in zip(targets[4],targets[5],targets[7]):
            # #     print(rideDay.text,departureTime.text,carType.text)
    
    elif pages == None:
        for i in range(len(targets)//4):
            for rideDay,departureTime,via,carType in zip(targets[0+i*4],targets[1+i*4],targets[2+i*4],targets[3+i*4]):
                # print(rideDay.text,departureTime.text,carType.text)
                rideDayList.append(rideDay.text)
                departureTimeList.append(departureTime.text)
                viaStaList.append(via.text.replace("　　","").replace("　",""))
                carTypeList.append(carType.text)
                startStaList.append(startStaName)
                finalStaList.append(finalStaName)
        
        # #點擊重新班次查詢
        # driver.find_element(By.ID, "ctl00_ContentPlaceHolder1_btnClear").click() 
        # driver.find_element(By.NAME, 'ctl00$ContentPlaceHolder1$txtS_Date1').clear()

    saveData = pd.DataFrame({"起站":startStaList,"迄站":finalStaList,
                              "乘車日期":rideDayList,"發車時間":departureTimeList,
                              "經由站":viaStaList,"車種":carTypeList})    
    
    #刪除符合正則的資料列，如:乘車日期=（1/4)就刪除資料列
    for i in range(len(saveData)):  #取出saveDate筆數
        if re.match(r"（\d+/\d+", saveData["乘車日期"][i]) or re.match(r"\s\s\d+", saveData["乘車日期"][i]):  #https://docs.python.org/zh-tw/3/library/re.html
            saveData.drop(index = i, axis = 0, inplace = True) #https://blog.csdn.net/qq_18351157/article/details/105785367
    saveData.index = [i for i in range(len(saveData))] #將index重新排列    
    # saveData.to_csv("kingbusCrawler.csv",encoding="ansi")
                        
    driver.quit() # 關閉chromedriver.exe  如果放在saveDate = pd.DataFrame前會出錯，ref: https://stackoverflow.com/questions/72355506/selenium-max-retries-exceeded-with-url

    result[index] = saveData



if __name__ == "__main__":
    # saveDate=crawlerSchedule("A21","G67","板橋","台中",['2023/09/09', '2023/09/10', '2023/09/11', '2023/09/12', '2023/09/13'])
    
    # saveData2=crawlerSchedule("U03","F14","宜蘭","梨山",'2023/09/09')
    # print(list(saveData2["起站"]))
    # print(len(saveData2)) #印出資料筆數
    # result = {}
    # for i in range(len(saveData2)):
    #     print(list(saveData2.iloc[i]))
    #     result[i] = list(saveData2.iloc[i])
        
    # saveData3=crawlerSchedule("U03","F14","宜蘭","梨山",
    #                           ['2023/09/09', '2023/09/10', '2023/09/11', 
    #                            '2023/09/12', '2023/09/13']).to_json(force_ascii=False)
    
    
    date_list=["2023/09/07","2023/09/08","2023/09/09"]
    # 建立 date_list個數 個子執行緒
    threads = [None] * len(date_list)
    results = [None] * len(date_list)
    
    for i in range(len(date_list)):
        threads[i] = threading.Thread(target = crawlerScheduleThread, 
                    args = ("U03","F14","宜蘭","梨山", date_list[i], results, i) )
        threads[i].start()

    # 等待所有子執行緒結束
    for i in range(len(date_list)):
        threads[i].join()
    
    schedule = pd.concat(results)
    print(schedule)