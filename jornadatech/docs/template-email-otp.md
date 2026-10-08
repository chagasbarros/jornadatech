# Template do email de código de acesso (OTP)

O login usa `signInWithOtp` + `verifyOtp` do Supabase Auth. O email com o código é enviado
pelo próprio Supabase, com o template configurado no painel — ele **não** fica no código da
aplicação. Este arquivo é a fonte de verdade do template: ao alterar no painel, atualize aqui.

## Onde configurar

Supabase → Authentication → Emails → Templates:

- **Magic Link** — usado pelo `signInWithOtp` para quem já tem conta.
- **Confirm signup** — usado no primeiro acesso, quando o `signInWithOtp` cria o usuário.

Os dois usam o mesmo assunto e o mesmo HTML abaixo.

## Assunto

```
Seu código de acesso: {{ .Token }}
```

Com o código no assunto, ele aparece até na notificação do celular. Se o painel não
substituir a variável no assunto, use `Seu código de acesso à Jornada Tech`.

## Corpo (HTML)

```html
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#f4f6f5;">
  <tr>
    <td align="center" style="padding:24px 16px;">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:480px;background-color:#ffffff;border-radius:8px;">
        <tr>
          <td bgcolor="#0B5A48" style="background-color:#0B5A48;padding:20px 24px;border-radius:8px 8px 0 0;font-family:Arial,Helvetica,sans-serif;font-size:20px;font-weight:bold;color:#ffffff;">
            Jornada Tech
          </td>
        </tr>
        <tr>
          <td style="padding:24px;font-family:Arial,Helvetica,sans-serif;font-size:16px;line-height:24px;color:#1f2937;">
            <p style="margin:0 0 16px;">Use o código abaixo para entrar na Jornada Tech:</p>
            <p style="margin:0 0 16px;font-family:'Courier New',Courier,monospace;font-size:32px;font-weight:bold;letter-spacing:6px;color:#0B5A48;text-align:center;">{{ .Token }}</p>
            <p style="margin:0 0 8px;font-size:14px;color:#4b5563;">O código expira em pouco tempo e só pode ser usado uma vez.</p>
            <p style="margin:0;font-size:14px;color:#4b5563;">Se você não pediu este código, ignore este email.</p>
          </td>
        </tr>
      </table>
    </td>
  </tr>
</table>
```

## Regras para alterar o template

- `{{ .Token }}` deve aparecer como **texto visível**. Nunca dentro de `href`: o template
  antigo usava `<a href="{{ .Token }}">Sign in</a>`, e o código não aparecia no app do Outlook
  para celular.
- Não usar `{{ .ConfirmationURL }}` (link mágico): o app só aceita o código.
- Layout em `<table>` com estilos **inline**. O Outlook para celular pode descartar o bloco
  `<style>`.
- Cores de fundo **sólidas** (`bgcolor` + `background-color`). Sem `linear-gradient` nem
  `background-image`: o Outlook não os suporta, e texto claro sobre eles fica invisível.
- Textos em português.
- Depois de alterar, teste pedindo um código em `/login` e conferindo no Outlook (web e
  celular) e no Gmail, com o modo escuro ligado e desligado.
