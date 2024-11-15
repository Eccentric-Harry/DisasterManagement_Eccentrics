import asyncio
from twikit import Client, TooManyRequests
from datetime import datetime
import csv
import os
import json
from random import randint
COOKIES = {
    "IDE": "AHWqTUkf7vbpk1-o3dxsJjJeRjPtEI8qDHof1Vm0xb14Zw7PzRJgGuR8xRVPPfqw",
    "_ga": "GA1.2.1410684390.1725563519",
    "_gid": "GA1.2.796657842.1727453529",
    "auth_multi": "\"1799443270243897344:24e4e20e51d783fc08c427bce0017460c079ffdd\"",
    "auth_token": "4c3d02551c12000bff1c167f07048528c0be89e4",
    "ct0": "a70b599ead16fec95163cb29f7be8aaa926fc5790aa4737209c2181a4615b90af8d3045643ef49c796193e15067b39b80dd111c9372c2a133d4d4039f55202b085bb82b9f5ec358686d9305361fa3372",
    "des_opt_in": "Y",
    "dnt": "1",
    "g_state": "{\"i_l\":0}",
    "gt": "1839738205756870718",
    "guest_id": "v1%3A172746322219318794",
    "guest_id_ads": "v1%3A172746322219318794",
    "guest_id_marketing": "v1%3A172746322219318794",
    "kdt": "ReNCnG3uEhdszQzrNjxLLeDQnpD8ch8ZlydVnM2i",
    "lang": "en",
    "night_mode": "2",
    "personalization_id": "\"v1_Dc4p3BPLufuBUH1WTL3ueA==\"",
    "twid": "u%3D1820188424231694336"
}

MINIMUM_TWEETS = 20
QUERY = ('("flood" OR "floods" OR "#flood" OR "#floods" OR "earthquake" OR "earthquakes" OR '
         '"#earthquake" OR "#earthquakes" OR "landslide" OR "landslides" OR "#landslide" OR '
         '#"landslides") AND ("Andhra Pradesh" OR "Arunachal Pradesh" OR "Assam" OR "Bihar" OR '
         '"Chhattisgarh" OR "Goa" OR "Gujarat" OR "Haryana" OR "Himachal Pradesh" OR '
         '"Jharkhand" OR "Karnataka" OR "Kerala" OR "Madhya Pradesh" OR "Maharashtra" OR '
         '"Manipur" OR "Meghalaya" OR "Mizoram" OR "Nagaland" OR "Odisha" OR "Punjab" OR '
         '"Rajasthan" OR "Sikkim" OR "Tamil Nadu" OR "Telangana" OR "Uttar Pradesh" OR '
         '"Uttarakhand" OR "West Bengal") lang:en since:2024-09-01 -is:retweet')

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

if __name__ == "_main_":
    asyncio.run(main())