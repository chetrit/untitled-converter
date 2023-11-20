*** Settings ***
Library  SeleniumLibrary

*** Variables ***
${expect}  My Test App
${url}  http://localhost:3000
${Browser}  Chrome
${delay}  1
${chrome_driver_path}  chromedriver.exe

*** Test Cases ***
1. Open Website Chrome
    Open Browser  ${url}  ${Browser}  options=add_experimental_option('excludeSwitches', ['enable-logging'])  executable_path=${chrome_driver_path}
    Set Selenium Speed  0.1

2. Input username and password
    Input Text  id=email  james.bond@gmail.com
    Input Text  id=password  Spectre007
3. Login
    Click Button  id=signIn_button
4. Go to all currencies page
    Click Button  id=allCurrencies_button
5.Select a currency to convert
    Click Element  xpath=(/html/body/div/div/div/div/div/div)

6. Write currency and convert it
    Input Text  id=amount_filed  500
    Click Button  id=convert_button
7. Login out
    Click Button  id=logout_button
8. close Browser
    Close Browser