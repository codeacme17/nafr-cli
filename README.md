# nafr-cli

![Static Badge](https://img.shields.io/badge/Node-14-%232e2e2e?style=flat-square&labelColor=%231e1e1e)
![Static Badge](https://img.shields.io/badge/License-MIT-%232e2e2e?style=flat-square&labelColor=%231e1e1e)

CLI for leyoonafr.

### ✨ Create

```bash
nafr create [package-name]
```

Use the above command to create a project with default framework templates. There are three frameworks that you can chose.  

```bash
> vue
  react
  vanilla
```

### 💉 Inject

```bash 
nafr inject [plugin]
```

You can use above command to install a plugin and auto-configure to your project. The following are the existing plugins.

```bash
> axios
  tailwindcss
  eslint
```

### 🔧 Git

```bash
nafr git [options]
```

**options**

`-s, --standard`: shows a git commit standard.

`-e, --emoji`: display emojis from [gitmojis](https://github.com/carloscuesta/gitmoji).

