from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options
import csv
import time

# Path to your ChromeDriver executable
chrome_driver_path = r'C:\WebDriver\chromedriver-win64\chromedriver.exe'

# Initialize WebDriver
service = Service(chrome_driver_path)
options = Options()
options.add_argument("--start-maximized")  # Open browser in maximized mode
driver = webdriver.Chrome(service=service, options=options)

# Function to scrape posts by hashtag
def scrape_hashtag_posts(hashtag, max_posts=100):
    driver.get(f"https://www.instagram.com/explore/tags/{hashtag}/")
    time.sleep(5)  # Wait for page to load

    posts = []
    post_count = 0

    while post_count < max_posts:
        # Load more posts by scrolling down
        driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")
        time.sleep(5)  # Wait for new posts to load

        # Find post elements
        post_elements = driver.find_elements(By.CSS_SELECTOR, "article > div img")
        for element in post_elements:
            post_url = element.get_attribute("src")

            # Find the caption element
            post_parent = element.find_element(By.XPATH, "..")  # Get the parent of the image
            caption_element = post_parent.find_element(By.CSS_SELECTOR, "div.C4VMK span")
            caption = caption_element.text if caption_element else "No caption"

            posts.append([post_url, caption])
            post_count += 1
            if post_count >= max_posts:
                break

    return posts

# Function to scrape posts by search query
def scrape_search_posts(query, max_posts=100):
    driver.get(f"https://www.instagram.com/explore/tags/{query}/")
    time.sleep(5)  # Wait for page to load

    posts = []
    post_count = 0

    while post_count < max_posts:
        # Load more posts by scrolling down
        driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")
        time.sleep(5)  # Wait for new posts to load

        # Find post elements
        post_elements = driver.find_elements(By.CSS_SELECTOR, "article > div img")
        for element in post_elements:
            post_url = element.get_attribute("src")

            # Find the caption element
            post_parent = element.find_element(By.XPATH, "..")  # Get the parent of the image
            caption_element = post_parent.find_element(By.CSS_SELECTOR, "div.C4VMK span")
            caption = caption_element.text if caption_element else "No caption"

            posts.append([post_url, caption])
            post_count += 1
            if post_count >= max_posts:
                break

    return posts

# Save posts to CSV
csv_filename = 'instagram_posts.csv'
with open(csv_filename, 'w', newline='', encoding='utf-8') as file:
    writer = csv.writer(file)
    writer.writerow(['Post URL', 'Caption'])  # Adjust headers as necessary

    hashtags = ["disaster", "naturaldisaster"]  # Replace with your hashtags
    for hashtag in hashtags:
        posts = scrape_hashtag_posts(hashtag)
        for post in posts:
            writer.writerow(post)

    queries = ['disaster', 'flood', 'earthquake']  # Replace with your queries
    for query in queries:
        posts = scrape_search_posts(query)
        for post in posts:
            writer.writerow(post)

print("Finished scraping posts.")

# Close the browser
driver.quit()
