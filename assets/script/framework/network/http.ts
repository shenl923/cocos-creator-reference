//FIXME: DEMO code
class Http {
  public static post(url: string) {
    return new Promise((reslove, reject) => {
      var testUri = "https://gate.97kid.com/t/user/login";
      let xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function () {
        console.warn(xhr.status, xhr.response, xhr.responseText);
      };
      xhr.open("POST", testUri, true);
      xhr.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
      xhr.send(
        JSON.stringify({
          username: "peter",
          password: "123456",
        })
      );
      
      xhr.ontimeout = function (e) {
        // XMLHttpRequest 超时
      };

      // 设置期望的返回数据类型 'json' 'text' 'document' ...
      // xhr.responseType = '';
    });
  }

  public static fetchPost(url: string) {
    var testUri = "https://gate.97kid.com/t/user/login";

    const settings = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: "peter",
        password: "123456",
      }),
    };

    fetch(testUri, settings)
      .then((response) => response.text())
      .then((text) => {
        //console.warn("json123123", text);
      })
      .catch((e) => {
        console.warn("error", e);
      });
  }

  public static fetchGet(uri: string) {
    var testUri = "http://localhost:3000?name=qoqServer";
    //var testUri = "https://gate.97kid.com"
    const settings = {
      headers: {
        method: "GET",
        "Accept": "application/json",
        "Content-Type": "application/json",
      }
    };

    fetch(testUri, settings)
      .then((response) => response.text())
      .then((text) => {
        console.warn("resp", text);
      })
      .catch((e) => {
        console.warn("error", e);
      });
  }
}

export default Http;
