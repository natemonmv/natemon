# Set up hosting and replies in Safari

Use a GitHub account and a Google account that both belong to the wedding email. Do not use the Roblox accounts. If the wedding address is something like `hello@natemon.com` and that inbox does not exist yet, set up Porkbun email forwarding first so you can receive the verification messages. If the wedding address is already a Gmail you can open, start with that.

The website never downloads the guest list. A link asks about one invitation token, and the reply is written back to that same token. Each invitation row belongs to one event. This ceremony is `civil`. A later party on another day gets its own event name, its own rows, and its own link. The same person can have one row for each day.

## 1. Create the spreadsheet

1. In Safari, sign in to Google with the wedding email. Create the Google account with that address if it does not exist yet.
2. Go to [Google Sheets](https://sheets.google.com) and create a blank spreadsheet named `Villegas Wedding`.
3. Rename the first tab to `Invitations`.
4. Choose File, then Import, then Upload. Import `google/invitations-template.csv` and replace the current sheet.
5. Add four tabs named exactly `Events`, `Menu`, `Settings`, and `Responses`.
6. Import `google/events-template.csv` into `Events`, replacing that sheet. The `civil` row already points at `https://natemon.com/civil/` and records S'mores Cake for guests who attend.
7. Import `google/menu-template.csv` into `Menu`, replacing that sheet.
8. Import `google/settings-template.csv` into `Settings`, replacing that sheet.
9. Delete the two sample people on `Invitations` after you have tried a test link. Replace them with real guests:
   - `event`: `civil` for this ceremony
   - `greeting`: the name or names in the invitation sentence, such as `Elena and Marco`
   - `guest1_name`: the first guest's full name
   - `guest2_name`: the partner's full name, or leave it blank for a single guest
10. Leave `token` blank for now. Add as many household rows as you need. Every row for this ceremony uses `civil`.

The invitation lists the chosen menu. Ravioli is served to everyone for the first course. Each guest chooses one main the day of the reception, either the filet mignon or the Northern halibut, and a vegan option will be available. The reply form does not collect that choice. Dessert is S'mores Cake for every guest who is attending, and the script records that on the response row.

## 2. Add the script

1. In the spreadsheet, choose Extensions, then Apps Script. This attaches the script to the sheet. Do not create a separate script at script.google.com.
2. Replace the starter code with the full contents of `google/Code.gs`.
3. Save, then reload the spreadsheet. A Wedding menu appears.
4. Choose Wedding, then Generate invitation tokens. Approve the requested access while you are signed in with the wedding email.
5. Each guest row now has a 12-character token.

## 3. Publish the form endpoint

1. In Apps Script, choose Deploy, then New deployment.
2. Choose the gear, then Web app.
3. Set Execute as to Me.
4. Set Who has access to Anyone.
5. Deploy and copy the web app URL. It ends in `/exec`.
6. Paste that URL between the quotes at `scriptUrl` in `civil/config.js`.

Anyone can call that URL, but a caller only gets the names for a token they already know. Keep the spreadsheet itself private. Do not publish it to the web.

## 4. Make the invitation links

The ceremony address already lives on the `Events` tab, in the `civil` row. Keep the trailing slash.

In `Invitations` cell F1, type `link`. In F2, paste:

```text
=IF(A2="","",IFERROR(INDEX(Events!B:B, MATCH(B2, Events!A:A, 0)), "") & "?invite=" & A2)
```

Fill that formula down. Send each household only its own link.

A couple's link locks both full names and lets them accept or decline separately. A single guest's link has no partner fields and no way to add a plus-one. Opening the site without a token shows only an invitation-required page.

Submitting again from the same link updates that household's row on `Responses`.

## 5. Put the site on GitHub

1. In Safari, go to [github.com/signup](https://github.com/signup) and create the account with the wedding email. Confirm the email before continuing.
2. Create a new repository named `natemon`. Leave it public. Do not add a README, license, or `.gitignore`, because the files already exist on your computer.
3. On the new repository page, choose uploading an existing file. Upload everything in `/Users/nvillegas/Documents/villegas-wedding`, including `CNAME`, `.nojekyll`, `index.html`, `civil`, and `google`. Do not upload a `.DS_Store` file if Finder shows one.
4. Open the repository Settings, then Pages. Under Build and deployment, set the source to Deploy from a branch, the branch to `main`, and the folder to `/ (root)`. Save.
5. Wait until the site is live at `https://<your-github-username>.github.io/natemon/`. Open `/civil/` on that address and confirm the invitation appears before you point the domain at it.
6. On that same Pages screen, under Custom domain, enter `natemon.com` and save. The repository already contains a `CNAME` file with that name.

The repository can be public. Guest names, phone numbers, email addresses, and mailing addresses are not in it. They stay in the private spreadsheet.

## 6. Point Porkbun at GitHub Pages

1. Sign in at [porkbun.com](https://porkbun.com) and open Domain Management.
2. Next to `natemon.com`, open the details and choose DNS.
3. Delete the parking records Porkbun adds by default. Those are usually an `ALIAS` for the blank host and a `CNAME` for `www`, plus any URL forwarding. Leave MX records alone if you are using them for wedding email.
4. Add four `A` records. Leave Host blank, or enter `@` if Porkbun requires it. Use TTL `600`. The Answer for each record is one of these addresses:

```text
185.199.108.153
185.199.109.153
185.199.110.153
185.199.111.153
```

5. Add one `CNAME` record. Host is `www`. Answer is `<your-github-username>.github.io`. Do not add `https://`. TTL `600`.
6. Wait about 30 minutes, then return to the repository Pages settings and choose Check again next to the custom domain. When the check passes, turn on Enforce HTTPS.

`https://natemon.com/` then shows the placeholder. `https://natemon.com/civil/` is the invitation, and the placeholder does not link to it. When a fuller site is built later, keep `civil/` as its own folder and leave it out of the navigation.

## 7. Connect replies after the site is public

1. Paste the Apps Script web app URL into `scriptUrl` in `civil/config.js`.
2. Upload the changed `civil/config.js` to the repository, replacing the existing file.
3. On the `Events` tab, confirm the `civil` row's address is `https://natemon.com/civil/`, including the trailing slash.

## 8. Test one sample guest

1. Add yourself as a single guest and generate a token.
2. Open that invitation link in Safari.
3. Submit a reply with a phone number, email, and mailing address.
4. Confirm one row appears on `Responses` and the names match the sheet even if someone edits the page.
5. Delete the test row when you are finished.

Collected details are the household email, phone, and mailing address, plus each guest's attendance. A guest who is attending is recorded with S'mores Cake as dessert.
