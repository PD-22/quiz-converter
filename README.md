### Start app:

```sh
npm i
npm start
```

### How it works:
* parseQuizPdf converts pdf file to string
* formatQuiz converts file string into quiz object
  #### example:
  ```js
  [
    {
      number: '21',
      question: 'საქართველოს კონსტიტუციით, რა არის ბრალდებულის წინასწარი პატიმრობის მაქსიმალური ვადა?',       
      options: [ 'ა. 21 დღე', 'ბ. 6 თვე', 'გ. 2 წელიწადი', 'დ. 9 თვე' ],
      answer: 'დ'
    }
  ]
  ```
* quiz object json file is created
* genQuizExcel creates quiz excel file
