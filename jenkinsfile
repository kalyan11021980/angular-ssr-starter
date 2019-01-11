// This shows a simple example of how to archive the build output artifacts.
node {
        stage('Checkout SCM'){
                git branch: 'SP2', url: 'git@github.com:kalyan11021980/angular-ssr-starter.git'
        }

        stage('Install node modules'){
                sh "npm install"
        }
        stage('Build'){
                sh "npm run build:ssr"
        }
        stage('Deploy'){
                sh "pm2 restart all"
        }
}
