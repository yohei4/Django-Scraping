import os
import cv2

def main():
    """
    images下の美人画像一覧を読み出し、faces下に顔画像検出した結果を保存する
    """
    for image_path, dirs, files in os.walk('src/media/user_2'):
        if len(dirs):
            continue
        
        # faceディレクトリの作成
        face_path = 'src/media/user_2/faces'
        if not os.path.exists(face_path):
            os.makedirs(face_path)

        # メイン処理
        for file_name in files:
            print(file_name)
            if not file_name.startswith('.'):
                save_faces(image_path, face_path, file_name)

def save_faces(image_path, face_path, file_name):
    """
    真正面顔判定用のOpenCVファイルを使って、顔画像を切り出す
    """
    print(image_path, face_path, file_name)
    # カスケード分類器を読み込む(正面顔の検出分類器)
    cascade = cv2.CascadeClassifier('models/haarcascades/haarcascade_frontalface_default.xml')
    image = cv2.imread('{}/{}'.format(image_path, file_name))
    gray_image = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    faces = cascade.detectMultiScale(gray_image)
    # Extract when just one face is detected
    if (len(faces) == 1):
        (x, y, w, h) = faces[0]
        image = image[y:y+h, x:x+w]
        image = cv2.resize(image, (100, 100))
        cv2.imwrite('{}/{}'.format(face_path, file_name), image)
    else:
        cv2.imwrite('{}/{}'.format(face_path + "/misses", file_name), image)
        print("skipped.")

if __name__ == '__main__':
    main()
    # for curDir, dirs, files in os.walk("src/media/user_2"):
    #     print('===================')
    #     print("現在のディレクトリ: " + curDir)
    #     print('===================')
    #     for file in files:
    #         print("内包するファイル: " + file)