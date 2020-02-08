
node {
    checkout scm

    def admin_image
    def ENV_NAME = "${env.BRANCH_NAME}"
    def buildCancelled = false

    try {
        if (ENV_NAME == 'prod' || ENV_NAME == 'master' || ENV_NAME == 'jenkins') {
            echo('Whitelisted branch detected: ' + ENV_NAME);
        } else {
            buildCancelled = true;
            error('Branch is not allowed, cancelling build...');
        }

        stage("build") {
            docker.withRegistry("https://docker.ossystem.ua") {
                admin_image = docker.build("bm.ossystem.ua/api:${env.BUILD_TAG}", "-f docker/admin/Dockerfile .")
                admin_image.push()
            }
        }

        stage("test images") {
            sh "echo they are fine, I hope"
        }

        stage("deploy") {
            timeout(time: 180, unit: 'SECONDS') {
                withEnv([
                    "ADMIN_IMAGE_NAME=docker.ossystem.ua/${admin_image.id}",
                    "ENV=${env.BRANCH_NAME}",
                ]) {
                    kubernetesDeploy configs: 'kubernetes.yml', kubeconfigId: 'kuber-ossystem-ua-kubeconfig'
                }
            }
        }
    } catch (e) {
        if (buildCancelled) {
            currentBuild.result = 'ABORTED';
            echo('Aborted build because i cant find branch ' + ENV_NAME);
            return;
        }
        throw e;
    }
}
