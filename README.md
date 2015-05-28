## APIDoc-MD

Generate API documentation for your README from comments in your
source-code. Uses [apiDoc](https://github.com/apidoc/apidoc).

## Usage

1. add comments of the following format to routes in your codebase:

```js
/**
 * @api {get} /stripe/:id fetch stripe customer
 * @apiName GetCustomer
 * @apiGroup Stripe
 *
 * @apiParam {String} id a username.
 *
 * @apiSuccess {String} status of paid stripe subscription.
 * @apiSuccess {Boolean} expired is the user's license expired.
 * @apiSuccess {String} email email associated with stripe subscription.
 * @apiSuccess {Integer} next_billing_date when will we next charge the card.
 * @apiSuccess {Integer} next_billing_amount how much will we next charge you.
 * @apiSuccess {Object} card object representing the user's credit-card
 *
 * @apiError CustomerNotFound a customer for this npm user does not yet exist.
 */
 function myAwesomeHandler() {}
```

2. rename your README.md to README.md.mustache
3. add the following template code to README.md.mustache

```markdown
{{#each api}}
## {{@key}}

{{#each this}}
### {{type}} {{url}}

{{title}}

{{#each parameters}}
{{#if @first}}**Parameters**

{{/if}}
* **`{{{type}}}` {{field}}:** {{{description}}}
{{#if @last}}

{{/if}}
{{/each}}
{{#each success}}
{{#if @first}}**Response**

{{/if}}
* **`{{{type}}}` {{field}}:** {{{description}}}
{{#if @last}}

{{/if}}
{{/each}}
{{#each error}}
{{#if @first}}**Error**

{{/if}}
* **{{field}}:** {{{description}}}
{{#if @last}}

{{/if}}
{{/each}}
{{/each}}
{{/each}}
```
4. add a script to your package.json that looks something like this.

```json
{
  "scripts": {
    "build-docs": "apidoc-md generate"
  }
}
```
