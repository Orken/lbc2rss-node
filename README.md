lbc2rss-node
============

http://lbc2rss.superfetatoire.com - node version

Ce programme (mon premier en nodejs :p ) permet pour l'instant de parser les pages de recherche sur leboncoin.fr pour extraire les données des annonces en JSON.

Pour l'instant, j'ai choisi la solution de facilité (à mon avis) pour extraire les données sur la page en utilisant jQuery.

##Usage

il n'y a rien à configurer il suffit de lancer

`node server.js`

et d'interroger l'url `http://[server]:8000/json/[adresse de la recherche leboncoin]`

et voilà ...
