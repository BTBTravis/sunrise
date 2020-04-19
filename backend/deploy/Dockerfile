FROM python:3.7-alpine

RUN adduser -D runner

WORKDIR /home/runner

COPY requirements.txt requirements.txt
RUN python -m venv venv
RUN venv/bin/pip install -r requirements.txt
RUN venv/bin/pip install gunicorn

COPY app app
COPY sunrise.py deploy/start.sh ./
RUN chmod +x start.sh

ENV FLASK_APP sunrise.py

RUN chown -R runner:runner ./
USER runner

EXPOSE 5000
ENTRYPOINT ["./start.sh"]
