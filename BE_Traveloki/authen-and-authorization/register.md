---
icon: user-vneck
---

# Register

GitBook has a powerful block-based editor that allows you to seamlessly create, update, and enhance your content.

<figure><img src="https://gitbookio.github.io/onboarding-template-images/editor-hero.png" alt=""><figcaption></figcaption></figure>

### Writing content

### Add a new block

{% stepper %}
{% step %}
### Open the insert block menu

Press `/` on your keyboard to open the insert block menu.
{% endstep %}

{% step %}
### Search for the block you need&#x20;

Try searching for “Stepper”, for exampe, to insert the stepper block.
{% endstep %}

{% step %}
### Insert and edit your block

Click or press Enter to insert your block. From here, you’ll be able to edit it as needed.
{% endstep %}
{% endstepper %}



```
// Some code
```

## Create a new user

<mark style="color:green;">`POST`</mark> `/auth/register`

\<Description of the endpoint>

**Headers**

| Name          | Value              |
| ------------- | ------------------ |
| Content-Type  | `application/json` |
| Authorization | `Bearer <token>`   |

**Body**

| Name   | Type   | Description      |
| ------ | ------ | ---------------- |
| `name` | string | Name of the user |
| `age`  | number | Age of the user  |

**Response**

{% tabs %}
{% tab title="200" %}
```json
{
  "id": 1,
  "name": "John",
  "age": 30
}
```
{% endtab %}

{% tab title="400" %}
```json
{
  "error": "Invalid request"
}
```
{% endtab %}
{% endtabs %}
