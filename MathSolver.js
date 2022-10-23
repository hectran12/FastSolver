const axios = require('axios');


class MathSolver {
    constructor(latex_content, lang_solution) {
        this.createAtTime = new Date();
        this.lang_solution = lang_solution;
        // remove, if you like:)
        this.latex_content = latex_content
        this.author = 'Tran Trong Hoa';
        this.facebook = 'https://www.facebook.com/thehex101';
        this.github = '/thehex101';
        this.apiForm = 'https://mathsolver.microsoft.com/';
    }

    request_to_API (url, data) {
        return new Promise(async (resolve, reject) => {
            axios.post(
              url,
              data,
              {
                  headers: {
                      'authority': 'mathsolver.microsoft.com',
                      'accept': 'application/json',
                      'accept-language': 'vi,en;q=0.9,en-US;q=0.8',
                      'content-type': 'application/json',
                      'origin': 'https://mathsolver.microsoft.com',
                      'referer': 'https://mathsolver.microsoft.com/vi/solve-problem/10546%2B20%2B30',
                      'sec-ch-ua': '"Chromium";v="106", "Microsoft Edge";v="106", "Not;A=Brand";v="99"',
                      'sec-ch-ua-mobile': '?0',
                      'sec-ch-ua-platform': '"Windows"',
                      'sec-fetch-dest': 'empty',
                      'sec-fetch-mode': 'cors',
                      'sec-fetch-site': 'same-origin',
                      'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/106.0.0.0 Safari/537.36 Edg/106.0.1370.52'
                  }
              }
          ).then((res) => {
              resolve(res);
          }).catch((res)=>{
              reject(res);
          })
          
        });
    }

    solve() {
        return new Promise((resolve, reject) => {
            this.request_to_API('https://mathsolver.microsoft.com/cameraexp/api/v1/solvelatex', {
              'latexExpression': this.latex_content,
              'clientInfo': {
                  'platform': 'web',
                  'mkt': 'vi',
                  'skipGraphOutput': true,
                  'skipBingVideoEntity': true
              },
              'customLatex': this.latex_content,
              'showCustomResult': false
          }).then((res) => {
            const customData = res.data.results[0].tags[0].actions[0].customData;
            if (customData.length > 0) {
                const previewText = JSON.parse(customData).previewText;
                const parsePreviewText = JSON.parse(previewText);
                resolve(parsePreviewText);
            } else {
                reject({
                  customData: customData
                });
            }
          }).catch((res)=> {
                reject(res);
          })
        });
    }

    generator(max_question) {
        return new Promise((resolve, reject) => {
            this.request_to_API('https://mathsolver.microsoft.com/cameraexp/api/v1/generateproblems', {
                'latex': this.latex_content,
                'maxQuestions': max_question
            }).then((res)=>{
                resolve(res.data);
            }).catch((res)=>{
                reject(res);
            });
        });
    }
}


module.exports = {
  MathSolver
}

