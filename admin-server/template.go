package main

const htmlHead = `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta
      name="viewport"
      content="width=device-width, height=device-height, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
    />
    <title>Admin panel</title>
  </head>
  <body>
    <style>
      :target {
        background: #ffffc6;
      }
    </style>
    <script>
      const token = new URL(window.location.href).searchParams.get("token");

      const req = (url, params) => {
        params = params || {};
        params.token = token;
        const esc = encodeURIComponent;
        let query = Object.keys(params)
            .map(k => esc(k) + '=' + esc(params[k]))
            .join('&');

        const queryUrl = url + "?" + query;
        console.log(queryUrl);

        fetch(url + "?" + query, {
          method: "POST",
        })
          .then(resp => resp.json())
          .then(obj => {
            alert(obj.Text);
            console.log(obj);
            window.location.href += "#num-" + obj.Num;
            location.reload();
          })
      }

      const addKey = (num, inputId) => {
        req('/addKey', {
          key: document.getElementById(inputId).value,
          num: num,
        });
      }

      const updValue = (num, key, areaId) => {
        req('/updValue', {
          num: num,
          key: key,
          text: document.getElementById(areaId).value,
        });
      }

      const delValue = (num, key) => {
        req('/delValue', {
          num: num,
          key: key,
        });
      }
    </script>
    <h1>Admin panel</h1>
`

const htmlBottom = `
</body>
</html>`

const htmlSeparator = `<hr/>`

const htmlKeyValue = `
<b>%[1]s</b>: 
<textarea id="%[4]s" rows="5" cols="80">%[2]s</textarea>
<span>
<input type="button" onclick="updValue(%[3]v, '%[1]s', '%[4]s')" value="Save" />
<br/>
<input type="button" onclick="delValue(%[3]v, '%[1]s')" value="Delete" />
</span>
<br/><br>
`

const htmlAddKV = `
<br/>
Add field:
<input id="%[2]v" type="text" placeholder="key"/>
<input type="button" onclick="addKey(%[1]v, '%[2]v')" value="Add key" />`

const htmlAddEntry = `
<input type="button" onclick="req('/newEntry')" value="Add new entry" />
`
