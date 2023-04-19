
FROM mongo:4.4


VOLUME /data/db


EXPOSE 27017

CMD ["mongod", "--bind_ip_all", "--dbpath=/data/db"]