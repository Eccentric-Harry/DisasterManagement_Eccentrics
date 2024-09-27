from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import time
import csv

# Path to your ChromeDriver executable
chrome_driver_path = r'C:\WebDriver\chromedriver-win64\chromedriver.exe'

# Initialize WebDriver
service = Service(chrome_driver_path)
options = Options()
options.add_argument("--start-maximized")  # Open browser in maximized mode
driver = webdriver.Chrome(service=service, options=options)

# CSV file to store the scraped data
csv_filename = 'facebook_disaster_posts.csv'
with open(csv_filename, 'w', newline='', encoding='utf-8') as file:
    writer = csv.writer(file)
    writer.writerow(['Post Text', 'Video URL'])

try:
    # Open Facebook login page
    driver.get("https://www.facebook.com/")

    # Log in (replace with your credentials)
    WebDriverWait(driver, 20).until(EC.presence_of_element_located((By.ID, "email")))
    email_input = driver.find_element(By.ID, "email")
    password_input = driver.find_element(By.ID, "pass")
    email_input.send_keys("harinathrao13@gmail.com")  # Replace with your email
    password_input.send_keys("Hari@5297")  # Replace with your password
    password_input.send_keys(Keys.RETURN)

    # Wait for the page to load after login
    WebDriverWait(driver, 20).until(EC.presence_of_element_located((By.CSS_SELECTOR, "input[placeholder='Search Facebook']")))

    # Navigate to the search box
    search_box = driver.find_element(By.CSS_SELECTOR, "input[placeholder='Search Facebook']")
    search_box.send_keys("disaster")  # Replace with your search term
    search_box.send_keys(Keys.RETURN)

    # Wait and scrape posts
    time.sleep(10)  # Adjust time as necessary

    # Extract data (example of scraping posts and videos)
    posts = driver.find_elements(By.CSS_SELECTOR, "div[role='article']")  # Adjust selector as needed
    with open(csv_filename, 'a', newline='', encoding='utf-8') as file:
        writer = csv.writer(file)
        for post in posts:
            # Extract text
            text_elements = post.find_elements(By.CSS_SELECTOR, "div[data-ad-comet-preview='message']")  # Adjust selector for post text
            post_text = " ".join([element.text for element in text_elements])

            # Extract video URLs
            video_elements = post.find_elements(By.CSS_SELECTOR, "a[href*='video']")  # Adjust selector for video URLs
            video_urls = [video.get_attribute('href') for video in video_elements]
            video_url = video_urls[0] if video_urls else "N/A"  # Choose the first video URL if available

            writer.writerow([post_text, video_url])

finally:
    # Close the browser
    driver.quit()
