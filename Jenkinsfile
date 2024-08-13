pipeline {
    agent any

    stages {
        stage('构建') {
            steps {
                script {
                    // 检查 Docker 是否可用
                    sh 'docker --version'
                }
                withDockerContainer('node') {
                    sh 'node -v'
                    sh 'npm config set registry https://registry.npmmirror.com'
                    sh 'npm install'
                    sh 'npm run build'
                }
            }
        }
        stage('制品') {
            steps {
                script {
                    def timestamp = new Date().format('yyyy-MM-dd_HH:mm:ss')
                    def artifactName = "docs.tar.gz_${timestamp}"
                    dir('.vitepress/dist') {
                        sh 'pwd'
                        sh 'ls -al'
                        sh "tar -zcvf ${artifactName} *"
                        archiveArtifacts artifacts: artifactName,
                                         allowEmptyArchive: true,
                                         fingerprint: true,
                                         onlyIfSuccessful: true
                    }
                }
            }
        }
        stage('部署') {
            steps {
                sh 'pwd'
                sh 'ls -al'
            }
        }
    }
}
