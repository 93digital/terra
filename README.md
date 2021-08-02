# Terra

***v1.0.1***

Terra is a rewrite of the 93digital [Lama](https://93digital.gitlab.io/lama/) utility class. The class implements _dynamic filtering_ functionality in WordPress and allows users to quickly filter index/archive pages for custom post types using taxonomies and other custom filters.

**NOTE**: php >= 7.2 is required, earlier versions are not supported.

## Installation

### Composer

From your theme root, run the following command in your terminal to install Terra with [Composer](https://getcomposer.org/)

```bash
$ composer require 93devs/terra:dev-master
```

Then, in your `functions.php` add the following:

```php
$GLOBALS['terra'] = new \Nine3\Terra();
```

If you have used Lama for the project you're working on you will need to remove it and any initialisations for it, namely `\Nine3\Lama::init();` as the two tools cannot work side by side.

### Luna

If you're using the new 93digital Luna theme do not add any code to `functions.php`, instead create a new class file in `/inc`, (this is where you will also add any Terra actions or filters) eg:

```php
class Luna_Terra {
	public function __construct() {
		$GLOBALS['terra'] = new \Nine3\Terra();
	}
}
```

Then just instantiate the class in `/inc/class-luna.php` like so: `$this->terra = new Luna_Terra();`

## Development

[npm](https://www.npmjs.com/) is needed to compile the JS file.

```bash
npm install
```

### Build the JS

```bash
npm run build
```

## Debug

When [debugging is enabled](https://codex.wordpress.org/Debugging_in_WordPress) in WordPress Terra automatically outputs in the `debug.log` file, the following information:

- the [\$args](docs/HOOKS-FILTERS.md#5) array parameters passed to the WP_Query (when performing the ajax request)
- the [template](docs/USAGE.md#3) that is trying to load for each element found

Alternatively it's possible to set the constant `TERRA_DEBUG` to `true` to output that information inside the `wp-content/terra.log` file, add the following line to your starter theme/plugin:

```php
define( 'TERRA_DEBUG', true );
```
