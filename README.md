# Portfolio · Arthur De Meyer

Site en ligne : https://arthur-de-meyer.fr

Site statique (HTML, CSS, JS sans dépendance) hébergé sur GitHub Pages.
**Tout le contenu est dans `content.json`** : textes, projets, expériences, formations, images et CV.
Le code n'affiche que ce fichier, donc tu n'as plus besoin de l'ouvrir pour une mise à jour.

## Modifier le contenu sans coder (Pages CMS)

1. Va sur https://app.pagescms.org et connecte-toi avec GitHub
2. Autorise l'accès au dépôt `Portfolio-Arthur-De-Meyer-`
3. Ouvre le dépôt, branche `main`, puis **Portfolio** dans le menu
4. Modifie les champs, ajoute ou réordonne les projets, envoie une capture dans le champ image
5. Clique sur **Save** : Pages CMS fait le commit, GitHub Pages republie en une minute environ

Les images envoyées sont rangées dans `assets/`.

### Petites règles

- `**texte**` met un passage en gras (missions, étapes de projet, paragraphes)
- Le **premier projet** de la liste est affiché en grand
- La **LED verte** apparaît sur ce qui est actif : coche « Poste actuel » sur une expérience, ou choisis l'état « En cours » sur une formation ou une étape du plan de carrière
- L'**identifiant** d'un projet (ex. `ad-lab`) sert à la commande `open ad-lab` du terminal : pas d'espace ni d'accent

## Modifier à la main

Tu peux aussi éditer `content.json` directement sur GitHub (icône crayon). Garde un JSON valide : si le fichier casse, le site affiche un message d'erreur au lieu du contenu.

## Tester en local

`fetch` ne fonctionne pas en ouvrant `index.html` en double-clic. Lance un petit serveur :

```bash
python -m http.server 8000
# puis http://localhost:8000
```

## Fichiers

| Fichier | Rôle |
| --- | --- |
| `content.json` | Tout le contenu du site |
| `.pages.yml` | Formulaires de Pages CMS |
| `index.html` | Structure de la page |
| `style.css` | Style |
| `app.js` | Affichage du contenu, terminal interactif, fenêtres projet |
| `assets/` | Captures des projets et image de partage |
| `Cv.pdf` | CV téléchargeable |

Refonte de l'interface faite avec la méthode unslop de Damir Sokolovsky ([@heydamir](https://x.com/heydamir)), CC BY 4.0.
