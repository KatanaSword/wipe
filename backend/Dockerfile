FROM python

WORKDIR /wipe/backend

COPY . .

RUN pip install

CMD [ "fastapi", "dev", "app/main.py" ]