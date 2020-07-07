'use strict';
const userNameInput = document.getElementById('user-name');
const assessmentButton = document.getElementById('assessment');
const resultDivided = document.getElementById('result-area');
const tweetDivided = document.getElementById('tweet-area');

/**
 * 指定した要素の子どもを全て除去する
 * @param {HTMLElement} element HTMLの要素
 */
function removeAllChildren(element) {
  while (element.firstChild) { // 子どもの要素があるかぎり除去
    element.removeChild(element.firstChild);
  }
}

assessmentButton.onclick = () => {
  const userName = userNameInput.value;
  if (userName.length === 0) { // 名前が空の時は処理を終了する
    return;
  }

  // 診断結果表示エリアの作成
  removeAllChildren(resultDivided);
  const header = document.createElement('h3');
  header.innerText = '診断結果';
  resultDivided.appendChild(header);

  const paragraph = document.createElement('p');
  const result = assessment(userName);
  paragraph.innerText = result;
  resultDivided.appendChild(paragraph);

  // ツイートエリアの作成
  removeAllChildren(tweetDivided);
  const anchor = document.createElement('a');
  const hrefValue = '<a href="https://twitter.com/intent/tweet?button_hashtag=あなたのいいところ&ref_src=twsrc%5Etfw" class="twitter-hashtag-button" data-text="あなたのいいところ診断" data-show-count="false">Tweet #あなたのいいところ</a><script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>'
    + encodeURIComponent('あなたのいいところ')
    + '&ref_src=twsrc%5Etfw';
  anchor.setAttribute('href', hrefValue);
  anchor.className = 'twitter-hashtag-button';
  anchor.setAttribute('data-text', result);
  anchor.innerText = 'Tweet #あなたのいいところ';
  tweetDivided.appendChild(anchor);

  // widgets.js の設定
  const script = document.createElement('script');
  script.setAttribute('src', 'https://platform.twitter.com/widgets.js');
  tweetDivided.appendChild(script);

};

userNameInput.onkeydown = (event) => {
  if (event.key === 'Enter') {
    assessmentButton.onclick();
  }
};

const answers = [
  '{userName}さんのいいところは厳しさです。{userName}さんの厳しさがものごとをいつも成功に導きます。(`-‘)/',
  '{userName}さんのいいところはまなざしです。{userName}さんに見つめられた人は、気になって仕方がないでしょう。(じ-・)/',
　'{userName}さんのいいところは優しさです。{userName}さんの優しさが皆を笑顔にします。(^-^)/',
  '{userName}さんのいいところは知識です。博識な{userName}さんを多くの人が頼りにしています。(@-@)/',
  '{userName}さんのいいところはユニークさです。{userName}さんだけのその特徴が皆を楽しくさせます。(5-5)/',
  '{userName}さんのいいところは用心深さです。{userName}さんの洞察に、多くの人が助けられます。(!-!)/',
  '{userName}さんのいいところは雰囲気です。内側から溢れ出る{userName}さんの良さに皆が気を惹かれます。≪(・-・)/≫',
  '{userName}さんのいいところは決断力です。{userName}さんがする決断にいつも助けられる人がいます。(こ-こ)/',
  '{userName}さんのいいところは思いやりです。{userName}さんに気をかけてもらった多くの人が感謝しています。(へ-へ)',
  '{userName}さんのいいところは感受性です。{userName}さんが感じたことに皆が共感し、わかりあうことができます。(確-かに)/',
  '{userName}さんのいいところは節度です。強引すぎない{userName}さんの考えに皆が感謝しています。(・-・)|',
  '{userName}さんのいいところは気配りです。{userName}さんの配慮が多くの人を救っています。(ど-ぞ)/',
  '{userName}さんのいいところはメリハリです。{userName}さんの切り替えには皆が驚きます。(~-~)  =>  ([]-[])/',
  '{userName}さんのいいところはなんかすごいところです。{userName}さんはとにかくなんかすごいです。(・-・)?'
];

/**
 * 名前の文字列を渡すと診断結果を返す関数
 * @param {string} userName ユーザーの名前
 * @return {string} 診断結果
 */
function assessment(userName) {
  // 全文字のコード番号を取得してそれを足し合わせる
  let sumOfCharCode = 0;
  for (let i = 0; i < userName.length; i++) {
    sumOfCharCode = sumOfCharCode + userName.charCodeAt(i);
  }

  // 文字のコード番号の合計を回答の数で割って添字の数値を求める
  const index = sumOfCharCode % answers.length;
  let result = answers[index];

  result = result.replace(/{userName}/g, userName);
  return result;
}
