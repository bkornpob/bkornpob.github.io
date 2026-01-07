
https://www.lakera.ai/blog/inside-agent-breaker

For earlier levels, there are no additional defenses present, just the context and system prompt. On higher levels, you’ll also encounter **guardrails** that make attacks harder:

- **Intent Classifier Guardrails:** An automated classifier that analyzes your prompt, determines its primary intent, and checks it against a taxonomy of allowed actions.
- **LLM Judge**: Uses an LLM to evaluate if input contains malicious instructions.
- **Lakera Guard:** At the final stage, every prompt must pass Lakera Guard, which blocks known prompt injection patterns. This forces players to craft evasive, original attacks.

![](Pasted%20image%2020251219094224.png)

`H<200C>ello`
