curl https://raw.githubusercontent.com/gabycasper007/megasoftcalculator/master/docker-compose.yml > docker-compose.yml
docker-compose pull
docker-compose up --force-recreate --build -d