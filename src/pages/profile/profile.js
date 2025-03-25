document.addEventListener('DOMContentLoaded', function () {
    try {
        const mainCodeHTML = `
            <div class="profile-container">
                <div class="profile-container_header">
                    <img width="48" height="48" src="https://img.icons8.com/sf-regular/48/FFFFFF/admin-settings-male.png" alt="admin-settings-male"/>
                    <h2>프로필 설정</h2>
                </div>
                <div class="profile-container_box">
                    <div class="profile-section">
                        <label for="profile-image">이미지</label>
                        <div class="image-container">
                            <img id="profile-preview" width="96" height="96" src="https://img.icons8.com/color/96/test-account.png" alt="test-account" class="profile_img"/>
                            <input type="file" id="image-upload" accept="image/*" style="display: none;" />
                        </div>
                        <div class="plf_edit" id="upload-trigger">
                            <img width="30" height="30" src="https://img.icons8.com/sf-black-filled/64/FFFFFF/image.png" alt="image"/>
                        </div>
                    </div>
                    <div class="profile-section">
                        <div class="pro_name"><h3>${sessionStorage.getItem('familyName') || 'GUEST'} ${sessionStorage.getItem('givenName') || ''}</h3></div>
                    </div>
                    <div class="lg_box">
                        <div class="profile-section lg">
                            <div class="lglg stuNum_lglg">
                                <img src="https://img.icons8.com/pulsar-color/96/student-male.png" alt="student-male"/>
                            </div>
                            <div class="pro_schNum"><h5>${sessionStorage.getItem('studentNumber') || 'Guest Student'}</h5></div>
                        </div>
                        <div class="profile-section lg">
                            <div class="lglg line_lglg">
                                <img src="https://img.icons8.com/pulsar-color/96/gmail-new.png" alt="gmail-new"/>
                            </div>
                            <div class="email-container">
                                <div class="pro_email">
                                    <h5 id="email-text">${sessionStorage.getItem('email') || 'example@g.yju.ac.kr'}</h5>
                                </div>
                                <button id="copy-email" class="copy-btn">
                                    <img width="20" height="20" src="https://img.icons8.com/fluency-systems-regular/48/f594b5/copy--v1.png" alt="copy--v1"/>
                                </button>
                            </div>
                        </div>
                        <div class="profile-section lg">
                            <div class="lglg">
                                <a href="https://lin.ee/byNXODw">
                                    <img src="https://img.icons8.com/pulsar-color/96/FFFFFF/line-me.png" alt="line-me"/>
                                </a>
                            </div>
                            <div class="line-container">
                                <div class="conect_h5">
                                    <h5 id="line-toggle">LINE 연결</h5>
                                </div>
                                <!-- 吹き出し -->
                                <div class="line_torisetu" style="display: none;">
                                    <div class="torisetu_batsu">
                                        <i class="fa-solid fa-xmark fa-lg" style="color: #f1a7a0;"></i>
                                    </div>
                                    <div class="token_copy">
                                        <div class="tk_cp">
                                            <div class="title_line_logo"><img src="https://img.icons8.com/clouds/100/line-me.png" alt="line-me"/></div>
                                            <div class="title_line_txt"><h4>LINE 연결방법</h4></div>
                                            <div class="line_list">
                                                <ol>
                                                    <li>
                                                        아래 URL을 복사한다!!
                                                        <div class="token_copy">
                                                            <div class="token_copy_txt">
                                                                <p>コピーするToken</p>
                                                            </div> 
                                                            <div class="token_copy_lg">
                                                                <i class="fa-regular fa-copy"></i>
                                                            </div>                                                               
                                                        </div>
                                                    </li>
                                                    <li>
                                                        여기서 공식 라인을 추가한다!!
                                                        <a href="https://lin.ee/QzwyAVv">
                                                            <div class="line_add_btn">
                                                                <img width="30" height="30" src="https://img.icons8.com/ios/100/d5725b/line-me.png" alt="line-me"/>
                                                                <p>추가</p>
                                                            </div>
                                                        </a>
                                                    </li>
                                                    <li>
                                                        공식 계정의 톡에 방금 복사한 URL을 보내줘!
                                                    </li>
                                                    <li>
                                                        연결 완료!!
                                                    </li>
                                                </ol>
                                            </div>
                                        </div>
                                        <div class="vp_img">
                                            <!-- 必要な画像をここに追加 -->
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>    
                </div>
            </div>
        `;

        const mainElement = document.querySelector('main');
        mainElement.innerHTML += mainCodeHTML;

        // profileImageDiv を定義（これが問題の部分）
        const profileImageDiv = document.querySelector('.image-container'); // この部分を追加

        // クリックでファイル選択ボックスを開く
        document.getElementById('upload-trigger').addEventListener('click', function() {
            document.getElementById('image-upload').click();
        });

        // 画像が選択された時にプレビューを更新する
        document.getElementById('image-upload').addEventListener('change', function(event) {
            const file = event.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    document.getElementById('profile-preview').src = e.target.result;
                    sessionStorage.setItem('profileImage', e.target.result); // sessionStorageに保存
                };
                reader.readAsDataURL(file);
            }
        });

        document.getElementById('copy-email').addEventListener('click', function() {
            const emailText = document.getElementById('email-text').innerText;
            const tempInput = document.createElement('input');
            document.body.appendChild(tempInput);
            tempInput.value = emailText;  
            tempInput.select();  
            document.execCommand('copy');
            document.body.removeChild(tempInput); 
            alert(`복사 : ${emailText}`); 
        });

        // プロフィール画像を設定（profileImageがnull, undefined, false, 空文字のいずれかの場合はデフォルト画像を使用）
        const profileImage = sessionStorage.getItem('profileImage');
        const imgElement = document.createElement('img');
        if (!profileImage || profileImage === "false" || profileImage.trim() === "") {
            imgElement.src = 'https://img.icons8.com/color/96/test-account.png'; 
        } else {
            imgElement.src = profileImage;
        }
        profileImageDiv.innerHTML = ''; 
        profileImageDiv.appendChild(imgElement);

        // 以下、toggleMenu 関数を正しく定義
        function toggleMenu(event, menuClass) {
            const menu = document.querySelector(menuClass);

            if (menu.style.display === 'none' || menu.style.display === '') {
                menu.style.display = 'block';
                setTimeout(() => {
                    menu.classList.add('show');
                }, 10); // showクラスを追加してアニメーション開始
            } else {
                menu.classList.remove('show');
                setTimeout(() => {
                    menu.style.display = 'none';
                }, 300); // 非表示にするまでの時間を設定
            }
        }

        // LINE 연결をクリックした時に吹き出しの表示・非表示を切り替える
        document.getElementById('line-toggle').addEventListener('click', function(event) {
            toggleMenu(event, '.line_torisetu');
        });

        // 吹き出し内の閉じるボタンをクリックした時に吹き出しを閉じる
        document.querySelector('.torisetu_batsu').addEventListener('click', function() {
            const menu = document.querySelector('.line_torisetu');
            menu.classList.remove('show');
            setTimeout(() => {
                menu.style.display = 'none';
            }, 300); // 非表示にするまでの時間を設定
        });

    } catch (error) {
        console.error('Error loading profile HTML:', error);
    }
});
