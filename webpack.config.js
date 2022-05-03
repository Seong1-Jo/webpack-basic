// import
const path = require('path'); //모듈가져오기;
const HtmlPlugin = require('html-webpack-plugin'); //해당하는 패키지 가져오기
const CopyPlugin = require('copy-webpack-plugin'); //

//export
module.exports = {
  // 파일을 읽어들이기 시작하는 진입접 설정
  entry: './js/main.js', //webpack은 무조건 js/main.js부터 읽어 나가기 시작한다!

  // 결과물(번들)을 반환하는 설정(옵션: path, filename)
  output: {
    //현재는 주석처리해도 동작가능
    // path: path.resolve(__dirname, 'dist'), //node.js에서 필요로 하는 절대경로필요
    // filename: 'main.js',
    clean: true //clean을 하면 build를 하면 기존의 파일을 제거한다
  },

  module: {
    rules: [
      {
        test: /\.s?css$/, //정규표현식 작성 : 해석 - .css로 끝나는 확장자로 끝나는 것을 찾는 정규식, s?= s가있을수도없을수도 
        use: [ //test로 매칭해 use는 설치한 패키지들
          'style-loader', // 두번째 해석, 실제로 html에부분에 style부분에 삼입하는 용도, 이순서대로 작성필수!
          'css-loader', //먼저 해석됨(위에거보다), js에서 css파일을 해석하는 용도(패키지),
          'postcss-loader',
          'sass-loader' // 순서중요!
        ]
      },
      {
        test: /\.js$/,
        use: [
          'babel-loader'
        ]
      }
    ]
  },

  // 번들링 후 결과물의 처리 방식 등 다양한 플로그인들을 설정
  plugins: [
    new HtmlPlugin({
      template: './index.html'
    }),
    new CopyPlugin({ //copy
      patterns: [ //옵션
        { from: 'static'} //만들어놓은 폴더이름,
      ]
    })
  ],

  // devServer: { //host를 localhost로 바꾸기
  //   host: 'localhost'
  // }
  // output에  paht에 resolve 두번째에 폴더이름, filename에는 폴더안에들어갈 파일명
}