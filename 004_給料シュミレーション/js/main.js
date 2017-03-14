(function () {
  'use strict';
  alert("動いているか確認用");
  var btn = document.getElementById('btn');
  var sumDate = document.getElementById('sumDate')
  var sumPay = document.getElementById('sumPay')

  function checkForm() {
    if (document.fm1.comment.value == "" || document.fm2.comment.value == "") {
      alert("契約開始日、または契約終了日が未記入です。入力して下さい。");
      return false;
    } else {
      return true;
    }
  }

  function checkedRadioBtn() {
    var levelFlag = false;
    var typesFlag = false;
    for (var i = 0; i < document.check.level.length; i++) {
      if (document.check.level[i].checked) {
        levelFlag = ture;
      }
    }
    if (!levelFlag) {
      alert("レベル項目が選択されていません。");
    }
    for (var i = 0; i < document.check.types.length; i++) {
      if (document.check.types[i].checked) {
        typesFlag = ture;
      }
    }
    if (!typesFlag) {
      alert("タイプ項目が選択されていません。");
    }

  };

  function countDate() {
    // 契約期間確認
    var startComment = document.getElementById('startComment').value.split("-");
    var endComment = document.getElementById('endComment').value.split("-");

    var startDate = new Date(startComment[0], startComment[1] - 1, startComment[2]);
    var endDate = new Date(endComment[0], endComment[1] - 1, endComment[2]);

    var diff = endDate.getTime() - startDate.getTime();
    var daysPast = Math.floor(diff / (1000 * 60 * 60 * 24));
    document.getElementById('sumDate').innerHTML = daysPast;
    // 支払金額
    var countPoint = 0;
    var engineerPoint = 0;
    var pay = 0;

    for (var i = 0; i < 10; i++) {
      if (document.check.elements[0].checked) countPoint += 1;
      if (document.check.elements[1].checked) countPoint += 5;
      if (document.check.elements[2].checked) countPoint += 10;
      if (document.check.elements[3].checked) countPoint += 30;
      if (document.check.elements[4].checked) countPoint += 50;
      if (document.check.elements[5].checked) countPoint += 2;
      if (document.check.elements[6].checked) engineerPoint += 3;
      if (document.check.elements[7].checked) engineerPoint += 3;
      if (document.check.elements[8].checked) engineerPoint += 3;
      if (document.check.elements[9].checked) engineerPoint += 4;
    }
    var pay = countPoint * engineerPoint * daysPast * 10000
    var pay = daysPast * 10000
    document.getElementById('sumPay').innerHTML = pay;
  };

  btn.addEventListener('click', function () {
    checkForm();
    // checkedRadioBtn();
    countDate();
  });
})();
