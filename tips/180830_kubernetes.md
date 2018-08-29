# Kubernetes
- System for automating deployment, scaling, and management of containers 
- Open-Source and developed at Google
- Not limited to docker (rkt, LXD, ...)
- Not limited to one Cloud Service Provider (AWS, Azure, Google Cloud Platform. ...)

## Infos
### Pod
  - Enviorment running 1 - N containers sharing the same excecution enviorment, which allows inter-process communication
  - Usually runs 1 container, though
  - Has a unique IP address in the cluster

### Node
  - Physical/virtual server instance (e.g. AWS EC2 instance), which runs 0 - N `Pods`
  - Receives commands / pod specs (.yml or .json files) and is monitored via the `Kubelet` (process running on every node)

### Master node aka API Server
  - The node to interact with the cluster (starting, stopping, monitoring the nodes/pods)

## SetUp
### Kubectl
  - CLI/Client to make requests to the Kubernetes API server / master node
  - [How to install](https://kubernetes.io/docs/tasks/tools/install-kubectl/)
  - OSX: `brew install kubectl`

### Minikube
  - Running a kubernetes cluster on your local machine
  - [How to install](https://github.com/kubernetes/minikube/releases)
  - OSX + homebrew: `brew cast install minikube`
  - uses `VirtualBox` or an equivalent under the hood (has to be installed)
  - Provides only one `Node`

## Let's get started
### Minikube
  - Start the cluster: `minikube start`
  - Get the cluster ip address: `minikube ip`
  - Get the cluster status: `minikube status`
  - Stop the cluster: `minikube stop`

### Kubectl
#### Running pods
  - Running a pod spec file: `kubectl create -f <filename>.yaml`
  - Run a container with a given name: `kubectl run <name> --image=<imagename>`
  - Get a list of running pods: `kubectl get pods`
  - Get pod infos: `kubectl describe pod <name>`
  - Delete a pod: `kubectl delete pod <name>`

#### Access pods/app
  - Forward a port: `kubectl port-forward <pod-name> <local-port>:<app-pod-port>`

#### Dealing with credentials / private docker images
  - Creating a docker-hub secret to access private images: `kubectl create secret docker-registry <name-for-secret> --docker-server=https://index.docker.io/v1/ --docker-username=<your-name> --docker-password=<your-pword> --docker-email=<your-email>`
  - List secrets: `kubectl get secret`
  - Delete a secret: `kubectl delete secret <name>`

