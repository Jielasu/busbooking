# -*- coding: utf-8 -*-
"""
Created on Wed Sep 20 15:42:49 2023

@author: miyuki
"""

from bs4 import BeautifulSoup
import pandas as pd
import requests
from selenium import webdriver #載入 webdriver 模組
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import Select
from selenium.webdriver.support.wait import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.keys import Keys 
from time import sleep
import threading
import sqlite3
import datetime
import re
import sqlite3

def crawlerOrderGo1(identity,phone,startStaValue,finalStaValue,rideDay,hours,mins):
    url = "https://order.kingbus.com.tw/ORD/ORD_M_1510_OrderGo.aspx"
    s = webdriver.chrome.service.Service(r'./chromedriver.exe')
    driver=webdriver.Chrome(service=s) #建立瀏覽器物件
    driver.get(url) 
    
    rideDayList = []  #乘車日期
    departureTimeList = []  #發車時間
    viaStaList = [] #經由站
    carTypeList = []  #車種
    remainSeatsList = []  #剩餘座位數
    
    #輸入身分證字號
    driver.find_element(By.ID, 'ctl00_ContentPlaceHolder1_txtCustomer_ID').send_keys(identity)
    #輸入電話
    driver.find_element(By.ID, 'ctl00_ContentPlaceHolder1_txtPhone').send_keys(phone)
    #點擊下一步
    driver.find_element(By.ID, "ctl00_ContentPlaceHolder1_btnStep1_OK").click()
    #顯性等待起站選擇框出現
    WebDriverWait(driver, 5, 0.1).until(EC.presence_of_element_located((By.ID, 'ctl00_ContentPlaceHolder1_ddlStation_ID_From')))
    
    #選擇起站
    Select(driver.find_element(By.ID, 'ctl00_ContentPlaceHolder1_ddlStation_ID_From')).select_by_value(startStaValue)
    
    
    #等待1秒迄站選擇框可以被選擇
    sleep(1)
    #選擇迄站
    Select(driver.find_element(By.ID, 'ctl00_ContentPlaceHolder1_ddlStation_ID_To')).select_by_value(finalStaValue)
     
    #輸入乘車日期
    driver.find_element(By.ID, 'ctl00_ContentPlaceHolder1_txtOut_Dt').send_keys(rideDay)
    #輸入預計乘車時間的時跟分
    Select(driver.find_element(By.ID, 'ctl00_ContentPlaceHolder1_ddlHour')).select_by_value(hours)
    Select(driver.find_element(By.ID, 'ctl00_ContentPlaceHolder1_ddlMinute')).select_by_value(mins)
       
    #點擊下一步
    driver.find_element(By.ID, "ctl00_ContentPlaceHolder1_btnStep2_OK").click()
    #顯性等待選取班次出現
    WebDriverWait(driver, 5, 0.1).until(EC.presence_of_element_located((By.ID, 'ctl00_ContentPlaceHolder1_pnlStep3')))
  
    soup = BeautifulSoup(driver.page_source,"html.parser")
    
    driver.quit() # 關閉chromedriver.exe
    
    targets = soup.select("#ctl00_ContentPlaceHolder1_grdList td")
    
    for i in range(len(targets)//7):
        for rideDay,departureTime,via,remainSeats,carType in zip(targets[2+i*7],targets[3+i*7],targets[4+i*7],targets[5+i*7],targets[6+i*7]):
            rideDayList.append(rideDay.text)
            departureTimeList.append(departureTime.text)
            viaStaList.append(via.text.replace("　　","").replace("　",""))
            remainSeatsList.append(remainSeats.text)
            carTypeList.append(carType.text)
    
    saveData = pd.DataFrame({"乘車日期":rideDayList,"發車時間":departureTimeList,
                              "經由站":viaStaList,"剩餘座位數":remainSeatsList,
                              "車種":carTypeList})        
    return saveData

def crawlerOrderGo2(identity,phone,startStaValue,finalStaValue,rideDay,hours,mins,chooseNum):
    url = "https://order.kingbus.com.tw/ORD/ORD_M_1510_OrderGo.aspx"
    s = webdriver.chrome.service.Service(r'./chromedriver.exe')
    driver=webdriver.Chrome(service=s) #建立瀏覽器物件
    driver.get(url) 
    
    rideDayList = []  #乘車日期
    departureTimeList = []  #發車時間
    viaStaList = [] #經由站
    carTypeList = []  #車種
    remainSeatsList = []  #剩餘座位數
    
    #輸入身分證字號
    driver.find_element(By.ID, 'ctl00_ContentPlaceHolder1_txtCustomer_ID').send_keys(identity)
    #輸入電話
    driver.find_element(By.ID, 'ctl00_ContentPlaceHolder1_txtPhone').send_keys(phone)
    #點擊下一步
    driver.find_element(By.ID, "ctl00_ContentPlaceHolder1_btnStep1_OK").click()
    #顯性等待起站選擇框出現
    WebDriverWait(driver, 5, 0.1).until(EC.presence_of_element_located((By.ID, 'ctl00_ContentPlaceHolder1_ddlStation_ID_From')))
    
    #選擇起站
    Select(driver.find_element(By.ID, 'ctl00_ContentPlaceHolder1_ddlStation_ID_From')).select_by_value(startStaValue)
    
    
    #等待1秒迄站選擇框可以被選擇
    sleep(1)
    #選擇迄站
    Select(driver.find_element(By.ID, 'ctl00_ContentPlaceHolder1_ddlStation_ID_To')).select_by_value(finalStaValue)

    #輸入乘車日期
    driver.find_element(By.ID, 'ctl00_ContentPlaceHolder1_txtOut_Dt').send_keys(rideDay)
    #輸入預計乘車時間的時跟分
    Select(driver.find_element(By.ID, 'ctl00_ContentPlaceHolder1_ddlHour')).select_by_value(hours)
    Select(driver.find_element(By.ID, 'ctl00_ContentPlaceHolder1_ddlMinute')).select_by_value(mins)
    sleep(0.5)
    
    #點擊下一步
    driver.find_element(By.ID, "ctl00_ContentPlaceHolder1_btnStep2_OK").click()
    #顯性等待步驟三：選取班次出現
    WebDriverWait(driver, 5, 0.1).until(EC.presence_of_element_located((By.ID, 'ctl00_ContentPlaceHolder1_pnlStep3')))
    
    #選取班次    
    ##ctl00_ContentPlaceHolder1_grdList > tbody > tr:nth-child(2) > td:nth-child(2) > input[type=button]
    ##ctl00_ContentPlaceHolder1_grdList > tbody > tr:nth-child(3) > td:nth-child(2) > input[type=button]
    ##ctl00_ContentPlaceHolder1_grdList > tbody > tr:nth-child(4) > td:nth-child(2) > input[type=button]
    driver.find_element(By.CSS_SELECTOR, f"#ctl00_ContentPlaceHolder1_grdList > tbody > tr:nth-child({chooseNum+1}) > td:nth-child(2) > input[type=button]").click()
    sleep(1)
    
    driver.find_element(By.ID, "ctl00_ContentPlaceHolder1_btnStep3_OK").click()    
    #顯性等待步驟四：選取指定班次座位票種張數出現
    WebDriverWait(driver, 5, 0.1).until(EC.presence_of_element_located((By.ID, 'ctl00_ContentPlaceHolder1_pnlStep4')))
    
    #勾選電腦配位
    driver.find_element(By.ID, "ctl00_ContentPlaceHolder1_ckbComputer").click()
    #顯性等待電腦配位已被勾選
    WebDriverWait(driver, 5, 0.1).until(EC.element_located_to_be_selected((By.ID, 'ctl00_ContentPlaceHolder1_ckbComputer')))
    sleep(0.5)
    
    #訂票張數
    #1: #ctl00_ContentPlaceHolder1_rblTot_Count_0
    #2: #ctl00_ContentPlaceHolder1_rblTot_Count_1
    #3: #ctl00_ContentPlaceHolder1_rblTot_Count_2
    #4: #ctl00_ContentPlaceHolder1_rblTot_Count_3
    
    
    ##################################################################################
    
    # #訂票張數=1
    # driver.find_element(By.ID, "ctl00_ContentPlaceHolder1_rblTot_Count_0").click()
    # sleep(1)
    
    # #第一張票種 
    # Select(driver.find_element(By.ID, 'ctl00_ContentPlaceHolder1_ddlTicketType_ID1')).select_by_value("2")
    # sleep(1)
    
    ##################################################################################
    
    # #訂票張數=2
    # driver.find_element(By.ID, "ctl00_ContentPlaceHolder1_rblTot_Count_1").click()
    # sleep(1)
    
    # #第一張票種 
    # Select(driver.find_element(By.ID, 'ctl00_ContentPlaceHolder1_ddlTicketType_ID1')).select_by_value("2")
    # sleep(1)
    # #第二張票種 
    # Select(driver.find_element(By.ID, 'ctl00_ContentPlaceHolder1_ddlTicketType_ID2')).select_by_value("1")
    # sleep(1)
    
    ##################################################################################
    
    # #訂票張數=3
    # driver.find_element(By.ID, "ctl00_ContentPlaceHolder1_rblTot_Count_2").click()
    # sleep(1)
    
    # #第一張票種 
    # Select(driver.find_element(By.ID, 'ctl00_ContentPlaceHolder1_ddlTicketType_ID1')).select_by_value("1")
    # sleep(1)
    # #第二張票種 
    # Select(driver.find_element(By.ID, 'ctl00_ContentPlaceHolder1_ddlTicketType_ID2')).select_by_value("2")
    # sleep(1)
    # #第三張票種 
    # Select(driver.find_element(By.ID, 'ctl00_ContentPlaceHolder1_ddlTicketType_ID3')).select_by_value("3")
    # sleep(1)
    
    ##################################################################################
    
    #訂票張數=4
    driver.find_element(By.ID, "ctl00_ContentPlaceHolder1_rblTot_Count_3").click()
    sleep(1)                    
    
    #第一張票種 
    Select(driver.find_element(By.ID, 'ctl00_ContentPlaceHolder1_ddlTicketType_ID1')).select_by_value("1")
    sleep(1) 

    #第二張票種 
    Select(driver.find_element(By.ID, 'ctl00_ContentPlaceHolder1_ddlTicketType_ID2')).select_by_value("2")
    sleep(1)
    
    #第三張票種 
    Select(driver.find_element(By.ID, 'ctl00_ContentPlaceHolder1_ddlTicketType_ID3')).select_by_value("3")
    sleep(1)
    #第四張票種 
    Select(driver.find_element(By.ID, 'ctl00_ContentPlaceHolder1_ddlTicketType_ID4')).select_by_value("4")
    sleep(1)
    # ##################################################################################
    
    
    







    # ##################################################################################
    #確定訂票
    driver.find_element(By.ID, "ctl00_ContentPlaceHolder1_btnStep4_OK").click()
    sleep(3)
    
    #通知視窗點確定
    driver.find_element(By.ID, "ctl00_ContentPlaceHolder1_UsrMsgBox_btnOK").click()

    soup = BeautifulSoup(driver.page_source,"html.parser")
    driver.quit() # 關閉chromedriver.exe
    
    seatNumList = []
    ticketTypeList = []
    
    #=======================================================
    #另一種方法是動態抓目標的id，搭配for迴圈
    dollarAmount = soup.select_one("#ctl00_ContentPlaceHolder1_lblOrder_Amt").text
    
    for i in range(1,5):
        seatNumList.append(soup.select_one(f"#ctl00_ContentPlaceHolder1_lblASeat_no{i}").text)
        ticketTypeList.append(soup.select_one(f"#ctl00_ContentPlaceHolder1_lblATicketType_N{i}").text)
        
    #ctl00_ContentPlaceHolder1_lblATicketType_N1
    #ctl00_ContentPlaceHolder1_lblATicketType_N2
    #=======================================================
    
    
    #=======================================================
    # #這方法不太優:訂票數目不同seatNumList、ticketTypeList可能會有""在裡面
    # targets = soup.select("table#tblA_seat td")[3:] #抓座位號+票種
    # dollarAmount = soup.select_one("#ctl00_ContentPlaceHolder1_lblOrder_Amt").text
    # print(targets)
    # print(len(targets))
    # for i in range(len(targets)//2):
    #     for seatNum,ticketType in zip(targets[0+i*2],targets[1+i*2]):
    #         seatNumList.append(seatNum.text)
    #         ticketTypeList.append(ticketType.text)
    
    # #3張票
    # #seatNumList=['\n', '5', '\n', '6', '\n', '8', '\n', '']
    # #ticketTypeList=['\n', '全票', '\n', '孩童票', '\n', '來回票', '\n', '']
    
    # #4張票
    # #seatNumList=['\n', '5', '\n', '6', '\n', '7', '\n', '8']
    # #ticketTypeList=['\n', '全票', '\n', '孩童票', '\n', '來回票', '\n', '敬老票'] 
    # # del seatNumList[::2];del ticketTypeList[::2]
    #=======================================================

    saveData = {"座位號":seatNumList,"票種":ticketTypeList,"總金額":dollarAmount}
   
    return saveData

if __name__ == "__main__":
    # data = crawlerOrderGo1("C199322347","0912345678","A03","G67","2023/09/21","07","30")
    # data2 = crawlerOrderGo2("C199322347","0912345678","A03","G67","2023/09/22","07","30")
    data2 = crawlerOrderGo2("C199322347","0912345678","W44","U04","2023/09/22","07","30")
    print(data2)



        
