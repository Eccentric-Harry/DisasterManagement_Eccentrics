
import requests
from bs4 import BeautifulSoup

# URL of the IMDb Top 250 movies page
url = 'https://www.imdb.com/chart/top/?ref_=nv_mv_250'

# Fetch the page content
response = requests.get(url)
soup = BeautifulSoup(response.content, 'html.parser')

# Find the table containing the list of top movies
movie_table = soup.find('tbody', class_='lister-list')
movies = movie_table.find_all('tr')

# Loop through each movie and extract details
top_movies = []
for movie in movies:
    title_column = movie.find('td', class_='titleColumn')
    title = title_column.a.text
    year = title_column.span.text.strip('()')
    rank = title_column.get_text(strip=True).split('.')[0]
    
    rating_column = movie.find('td', class_='ratingColumn imdbRating')
    rating = rating_column.strong.text if rating_column.strong else 'N/A'

    top_movies.append({
        'rank': rank,
        'title': title,
        'year': year,
        'rating': rating
    })

# Display the results
for movie in top_movies:
    print(f"Rank: {movie['rank']}, Title: {movie['title']}, Year: {movie['year']}, Rating: {movie['rating']}")
