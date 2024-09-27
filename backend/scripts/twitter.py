import asyncio
from twikit import Client, TooManyRequests
from datetime import datetime
import csv
import os
import json
from random import randint

# Cookies as a dictionary (replace with your actual cookie values)
COOKIES = {
    "IDE": "AHWqTUkf7vbpk1-o3dxsJjJeRjPtEI8qDHof1Vm0xb14Zw7PzRJgGuR8xRVPPfqw",
    "_ga": "GA1.2.1410684390.1725563519",
    "_gid": "GA1.2.796657842.1727453529",
    "att": "1-1dE6eqjEEJQDjlgi3f96EdL8Xx5Gi3OES4Sy5t7g",
    "auth_token": "41f47aca4197fae92c4dc9eed57c76468ffb3ae8",
    "ct0": "c8590f65783c84d5af992a0c23860265508e60ecad8c325ce1a7c9feea6d6b44fe08d362773a5f0f6b9e956b6c233f135b25fab1361981cd943aa542c0e586cb25a7d4f57aa40290e8f54e826493ef19",
    "des_opt_in": "Y",
    "dnt": "1",
    "g_state": "{\"i_l\":0}",
    "gt": "1839698029915381932",
    "guest_id": "v1%3A172745372168264522",
    "guest_id_ads": "v1%3A172745372168264522",
    "guest_id_marketing": "v1%3A172745372168264522",
    "kdt": "ReNCnG3uEhdszQzrNjxLLeDQnpD8ch8ZlydVnM2i",
    "lang": "en",
    "night_mode": "2",
    "personalization_id": "\"v1_YPVQDiA2uKjCHmtUeiKKhQ==\"",
    "twid": "u%3D1499026936416583685"
}


MINIMUM_TWEETS = 100
QUERY = ('("flood" OR "floods" OR "#flood" OR "#floods") AND '
         '("earthquake" OR "earthquakes" OR "#earthquake" OR "#earthquakes") AND '
         '("landslide" OR "landslides" OR "#landslide" OR "#landslides") AND '
         '("Andhra Pradesh" OR "Arunachal Pradesh" OR "Assam" OR "Bihar" OR '
         '"Chhattisgarh" OR "Goa" OR "Gujarat" OR "Haryana" OR "Himachal Pradesh" OR '
         '"Jharkhand" OR "Karnataka" OR "Kerala" OR "Madhya Pradesh" OR "Maharashtra" OR '
         '"Manipur" OR "Meghalaya" OR "Mizoram" OR "Nagaland" OR "Odisha" OR '
         '"Punjab" OR "Rajasthan" OR "Sikkim" OR "Tamil Nadu" OR "Telangana" OR '
         '"Uttar Pradesh" OR "Uttarakhand" OR "West Bengal") lang:en')

async def get_tweets(client, tweets):
    if tweets is None:
        print(f'{datetime.now()} - Getting tweets...')
        tweets = await client.search_tweet(QUERY, product='Top')
    else:
        wait_time = randint(5, 10)
        print(f'{datetime.now()} - Getting next tweets after {wait_time} seconds ...')
        await asyncio.sleep(wait_time)
        tweets = await tweets.next()

    return tweets

async def main():
    # Create a CSV file in the backend/data directory
    csv_file_path = os.path.join('scripts', 'data', 'tweets.csv')
    
    # Ensure data directory exists
    os.makedirs(os.path.dirname(csv_file_path), exist_ok=True)

    with open(csv_file_path, 'w', newline='', encoding='utf-8') as file:
        writer = csv.writer(file)
        writer.writerow(['Tweet_count', 'Username', 'Text', 'Created At', 'Retweets', 'Likes', 'Image'])

    # Authenticate to X.com using cookies
    client = Client(language='en-US')
    
    # Load cookies from the COOKIES variable
    client.set_cookies(COOKIES)  # Ensure this method is correct as per your library's documentation

    tweet_count = 0
    tweets = None

    while tweet_count < MINIMUM_TWEETS:
        try:
            tweets = await get_tweets(client, tweets)
        except TooManyRequests as e:
            rate_limit_reset = datetime.fromtimestamp(e.rate_limit_reset)
            print(f'{datetime.now()} - Rate limit reached. Waiting until {rate_limit_reset}')
            wait_time = rate_limit_reset - datetime.now()
            await asyncio.sleep(wait_time.total_seconds())
            continue

        if not tweets:
            print(f'{datetime.now()} - No more tweets found')
            break

        for tweet in tweets:
            tweet_count += 1
            tweet_data = [tweet_count, tweet.user.name, tweet.text, tweet.created_at, tweet.retweet_count, tweet.favorite_count]

            # Append tweet data to the CSV file
            with open(csv_file_path, 'a', newline='', encoding='utf-8') as file:
                writer = csv.writer(file)
                writer.writerow(tweet_data)

        print(f'{datetime.now()} - Got {tweet_count} tweets')

    print(f'{datetime.now()} - Done! Got {tweet_count} tweets found')

# Run the async main function
if __name__ == "__main__":
    asyncio.run(main())
