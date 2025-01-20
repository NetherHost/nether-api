# Nether API

Nether API is a in-depth RESTful API for the Nether Host platform.

https://nether.host

---

## Getting Started

1. Clone the repository

```bash
git clone https://github.com/netherhost/api.nether.host.git
```

2. Install dependencies

```bash
npm install
```

3. Run the server

```bash
npm run dev
```

## Authentication

The Nether API uses token-based authentication. Every request must include an API key in the request headers.

```
Authorization: Bearer <API_KEY>
```

---

## Errors

Standard HTTP status codes are used to indicate the success or failure of a request.

| Status Code | Description           |
| ----------- | --------------------- |
| 200         | OK                    |
| 400         | Bad Request           |
| 401         | Unauthorized          |
| 403         | Forbidden             |
| 404         | Not Found             |
| 500         | Internal Server Error |

In the event of an error, the API will return a JSON object with more information.

```json
{
  "code": 401,
  "error": "Unauthorized",
  "message": "An invalid API key was provided."
}
```

### Rate Limiting

The Nether API has a rate limit of 100 requests per minute. Exceeding this limit will result in a `429 Too Many Requests` response.

`X-RateLimit-Remaining` returns the number of requests remaining in the current rate limit window.

---

## Support

If you have questions or need assistance, please contact us at [support@nether.host](mailto:support@nether.host) or join our [Discord server](https://discord.gg/netherhost).

---

## Contributing

We welcome contributions to the Nether API. Please see the [CONTRIBUTING.md](CONTRIBUTING.md) file for more information.

---

## License

This project is licensed under the Non-Commercial Collaboration License (NCCL). See the [LICENSE](LICENSE) file for more details.
