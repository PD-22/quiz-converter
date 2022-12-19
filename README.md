### start app:

```sh
npm i
npm start
```

### how it works:
* parseQuizPdf parses test/quiz.pdf file to string
* formatQuiz converts quiz into object
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
* genQuizExcel creates test/quiz.xlsx file
