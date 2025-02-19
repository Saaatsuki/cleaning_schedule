fetch('http://localhost:8080/api/clean')
  .then(response => response.json())  // JSONデータをパース
  .then(data => {
    if (data.success) {
      // 掃除スケジュール情報をループで処理
      data.data.forEach(entry => {
        console.log(`掃除日: ${entry.date}`);
        console.log(`クラス名: ${entry.className}`);
        console.log(`掃除エリア: ${entry.cleanArea}`);
        
        if (entry.members) {
          entry.members.forEach(member => {
            console.log(`メンバー: ${member.firstName} ${member.givenName}`);
            console.log(`学籍番号: ${member.studentNumber}`);
            console.log(`役割: ${member.cleanRole}`);
            console.log(`掃除回数: ${member.cleaningCount}`);
          });
        }
        
        console.log('------------------------');
      });
    } else {
      console.log('データ取得に失敗しました');
    }
  })
  .catch(error => {
    console.error('エラー:', error);
  });
