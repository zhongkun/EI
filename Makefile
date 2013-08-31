
init_db:
	python -W ignore tools/init_db.py

init_dep:
	pip install -r requirements.txt

web: init_dep #init_db
	gunicorn -c gunicorn_config.py app:app
