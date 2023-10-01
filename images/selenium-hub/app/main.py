import os, json, pika
from time import sleep
from datetime import datetime
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager

from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By

from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as ec

if __name__ == "__main__":
	options = webdriver.ChromeOptions()
	options.add_argument('--headless')
	# options.add_argument('--profile-directory=App')
	# options.add_argument('user-data-dir=/sessions')
	options.add_argument('user-agent=Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.81 Safari/537.36')

	driver = webdriver.Remote('http://selenium-hub:4444/wd/hub', options=options)
	driver.set_window_rect(width=1366, height=720)
	driver.get('https://wacdis.com/')
	now = datetime.now()
	driver.save_screenshot('screen'+ now.strftime("%m-%d-%Y_%H-%M-%S") +'.png')
	
	driver.close()
	quit()