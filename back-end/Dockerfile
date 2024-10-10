FROM python

# update Linux package manager
RUN apt-get update

#install python
RUN apt-get install -y python3

#install pip
RUN pip3 install --upgrade pip
#RUN apt install python3-pip

WORKDIR /back-end
COPY ./requirements.txt ./

#install dependencies (flask, flask_restful, flask_sqlalchemy)
RUN pip install --no-cache-dir -r requirements.txt

CMD ["bin/bash"]
