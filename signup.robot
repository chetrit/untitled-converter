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
2. Go to signUp page
    Click Element  xpath=(/html/body/div/div/main/div/form/div/div/a)
3. Input username, password and email
    Input Text  id=firstName  mickey
    Input Text  id=lastName  mouse
    Input Text  id=email  mickey.mouse@gmail.com
    Input Text  id=password  mickeyMouse
4. Sign up
    Click Button  id=signUp_button

5. Close Browser
    Sleep  5s
    Close Browser