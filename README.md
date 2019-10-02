# aws-profile

This command is a really simple wrapper around [AWS Vault](https://github.com/99designs/aws-vault) which adds a local config file to save keystrokes and help prevent mistakes. From their README:

> AWS Vault is a tool to securely store and access AWS credentials in a development environment.

To run a command (e.g. S3 list) under a "home" profile with AWS Vault, you run:

```
$ aws-vault exec home -- aws s3 ls
```

With aws-profile, you can save your profile in a `.awsprofilerc` file like so:

```yaml
profile: home
```

Then, you can just run:

```
$ aws-profile s3 ls
```

Or even:

```
$ awsp s3 ls
```

Note that it assumes you want to run the `aws` executable. If you don't, you can use a double dash (`--`):

```
$ aws-profile -- env
# runs 'env'
```

## Installation

```
$ npm install --global @stewartml/aws-profile
```

## More details

This script uses [rc-yaml](https://www.npmjs.com/package/rc-yaml) for configuration, so your `.awsprofilerc` file can be in YAML, JSON, or INI format.

You can put the config anywhere `rc` looks by [default](https://www.npmjs.com/package/rc#standards), including the `awsprofile_profile` environment variable, but not including command line options, as they would interfere with the command.

Here's what it would look like to use an environment variable:

```
$ awsprofile_profile=home awsprofile s3 ls
```

Not sure why you'd do that though...
