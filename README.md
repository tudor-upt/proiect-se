# Sistem de alegere Laptop

## Setup

Creaza si activeaza Python virtualenv (instaleaza `virtualenv` daca nu il ai deja):

`virtualenv venv`   

`source venv/bin/activate` (de fiecare data cand rulezi intr-un shell nou)

Instaleaza Django pentru backend:

`pip install django django-cors-headers`

Django Migration:

`python manage.py migrate`

## Porenste server-ul

`python manage.py runserver`

weight -> limita superioara
pret -> range
capacitate baterie -> limitai inferioara
battery life -> inferioara
base speed -> inferioara
