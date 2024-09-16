pipeline {
    agent any
    tools {
        nodejs 'node22.6.0' 
    }
    stages {
        stage('构建') {
            steps {
                sh 'node -v'
                sh 'npm -v'
                sh 'npm config set registry https://registry.npmmirror.com'
                sh 'npm install'
                sh 'npm run build' 
            }
        }
        stage('制品') {
            steps {
                script {
                    // 获取当前日期和时间，并格式化
                    def timestamp = new Date().format('yyyy-MM-dd_HH-mm-ss')
                    // 生成制品的文件名
                    def artifactName = "docs_${timestamp}.tar.gz"
                    
                    // 打包制品
                    dir('docs/.vitepress/dist') {
                        sh 'pwd'
                        sh 'ls -al'
                        sh "tar -zcvf ${artifactName} *" // 使用生成的文件名打包
                        // 归档制品
                        archiveArtifacts artifacts: artifactName,
                                         allowEmptyArchive: true, // 即使制品为空，仍然允许归档
                                         fingerprint: true,   // 为归档的制品生成一个唯一的指纹（哈希值）
                                         onlyIfSuccessful: true // 仅在构建成功时才归档制品
                    }
                }
            }
        }
        stage('部署') {
            steps {
                dir('docs/.vitepress/dist') {
                    sh 'pwd'
                    sh 'ls -al'
                }
            }
        }
    }
}

