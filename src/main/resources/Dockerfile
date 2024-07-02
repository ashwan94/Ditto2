FROM tomcat:10.1.17-jdk17
LABEL authors="Ditto"

RUN rm -Rf /usr/local/tomcat/webapps/ROOT
COPY ROOT.war /usr/local/tomcat/webapps/ROOT.war

EXPOSE 23124

CMD ["catalina.sh", "run"]