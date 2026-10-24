# GithubActions

### What is GitHub Actions?
GitHub Actions are packaged scripts to automate tasks in a software-development workflow in GitHub.

#### GitHub Actions featured on the Actions tab, you can:
- Search for GitHub Actions in the [GitHub Marketplace](https://github.com/marketplace?type=actions). The GitHub Marketplace allows you to discover and purchase tools that extend your workflow.
- Search for open-source projects. For example, the [GitHub Actions](https://github.com/actions) organization features many popular open-source repos containing GitHub Actions you can use.
- Write your own GitHub Actions from scratch. You can make them open source, or even publish them to the GitHub Marketplace.

<br>

#### Types of GitHub actions
There are three types of GitHub actions:
- **Container actions**:<br>With container actions, the environment is part of the action's code. These actions can only be run in a Linux environment that GitHub hosts. Container actions support many different languages.

    ```yaml
    name: 'Composite Sample'
    description: 'Runs simple inline shell commands'
    runs:
    using: 'composite'
    steps:
        - shell: bash
        run: echo "Hello from a composite action step!"
    ```

- **JavaScript actions**:<br>JavaScript actions don't include the environment in the code. You have to specify the environment to execute these actions. You can run these actions in a VM (virtual machine) in the cloud or on-premises. JavaScript actions support Linux, macOS, and Windows environments.

    ```yaml
    name: 'JavaScript Sample'
    description: 'Runs inline JavaScript directly on the runner VM'
    runs:
    using: 'node20'
    main: 'data:text/javascript,console.log("Hello from JavaScript Action!");'
    ```

- **Composite actions**:<br>Composite actions allow you to combine multiple workflow steps within one action. For example, you can use this feature to bundle together multiple run commands into an action, and then have a workflow that executes the bundled commands as a single step using that action.

    ```yaml
    name: 'Container Sample'
    description: 'Runs a command inside an Alpine Docker image'
    runs:
        using: 'docker'
        image: 'docker://alpine:latest'
        args:
            - 'echo'
            - 'Hello from inside a Docker container!'
    ```

#### Using actions in workflows
Here are practical usage examples of how each of the three types of actions would be called inside a standard `.github/workflows/main.yml` file using the `uses:` block.

Assuming your action is stored locally in your repository under a folder named `.github/actions/my-action` (or you can reference remote marketplace actions via `owner/repo@version`), here is how they are triggered:


##### 1. Usage Example: Container Action
Container actions require a Linux runner (`ubuntu-latest`) because they execute inside a Docker container.

```yaml
jobs:
  run-container:
    runs-on: ubuntu-latest # Must be Linux for container actions
    steps:
      - name: Checkout Code
        uses: actions/checkout@v4

      - name: Run Docker Container Action
        id: container-step
        uses: ./.github/actions/my-container-action  # Path to your container action
        with:
          who-to-greet: 'Alice'

      - name: View Output
        run: echo "Container finished at: ${{ steps.container-step.outputs.time }}"

```

##### 2. Usage Example: JavaScript Action

JavaScript actions are cross-platform. Because they run directly on the virtual machine runner host, you can choose whichever OS you need (`ubuntu-latest`, `windows-latest`, or `macos-latest`).

```yaml
jobs:
  run-js:
    runs-on: ubuntu-latest # Can also be windows-latest or macos-latest
    steps:
      - name: Checkout Code
        uses: actions/checkout@v4

      - name: Run JavaScript Action
        id: js-step
        uses: ./.github/actions/my-javascript-action  # Path to your JS action
        with:
          name: 'Bob'

      - name: View Output
        run: echo "${{ steps.js-step.outputs.greeting }}"

```

##### 3. Usage Example: Composite Action

Composite actions wrap multiple steps into one. When you call it, it executes all those bundled steps seamlessly under a single line in your main workflow.

```yaml
jobs:
  run-composite:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout Code
        uses: actions/checkout@v4

      - name: Run Setup & Test Bundle
        uses: ./.github/actions/my-composite-action  # Path to your composite action
        with:
          node-version: '20'
          
      # The workflow moves straight on because node setup, 
      # npm install, and tests were all handled inside the action!
      - name: Build Project
        run: npm run build

```