# Чек-лист тегов — Drive School

Номера строк указаны по версиям файлов на момент проверки. **Перед сдачей пересчитать заново после любых правок** — при сдвиге строк номера меняются.

⚠️ `instructors.html` — номера НЕ проставлены: версия файла, доступная для проверки, обрывается без `</main>`, footer и закрывающих тегов, а обе `<figure>` не содержат `<img>`. Нужна актуальная локальная версия файла, после чего строки пересчитать.

## Требуется на каждой странице

| Требование | index | about | instructors | price | schedule | contacts | fleet | colophon |
|---|---|---|---|---|---|---|---|---|
| Doctype, lang, charset, viewport | :1–2,3,4,5 | :1–2,3,4,5 | ⚠️ | :1–2,3,4,5 | :1–2,3,4,5 | :1–2,3,4,5 | :1–2,3,4,5 | :1–2,3,4,5 |
| meta description | :6 | :6 | ⚠️ | :6 | :6 | :6 | :6 | :6 |
| meta author | :7 | :7 | ⚠️ | :7 | :7 | :7 | :7 | :7 |
| Уникальный title | :8 | :8 | ⚠️ | :8 | :8 | :8 | :8 | :8 |
| Ровно один h1 | :13 | :13 | ⚠️ | :13 | :14 | :14 | :13 | :13 |
| header | :12 | :12 | ⚠️ | :12 | :13 | :13 | :12 | :12 |
| nav | :15 | :15 | ⚠️ | :15 | :18 | :18 | :15 | :16 |
| main | :27 | :27 | ⚠️ | :28 | :31 | :31 | :27 | :29 |
| footer с контактами | :34 | :54* | ⚠️ | :103 | :92 | :130 | :74 | :39 |
| copyright-сущность &copy; | :34 | :55* | ⚠️ | :105 | :94 | :132 | :76 | :41 |
| Комментарий-автор | :11 | :11 | ⚠️ | :11 | :11 | :11 | :11 | :11 |
| 2-й комментарий «почему» | :28 | — ⚠️ нет | ⚠️ | — ⚠️ нет | :17 | — ⚠️ нет | — ⚠️ нет | — ⚠️ нет |

`*` about.html — footer пока без строки с контактами (Адрес/тел/email), в отличие от остальных семи файлов. Нужно привести к единому виду.

⚠️ Комментарий «почему» (не «что») требуется на КАЖДОЙ странице дважды, а сейчас он явно есть только в `schedule.html` (:17) и в новом комментарии `index.html` (:28). В `about.html`, `price.html`, `contacts.html`, `fleet.html`, `colophon.html` нужно добавить минимум по одному-два комментария, объясняющих выбор тега, а не описывающих его.

## Требуется в сумме на паре страниц — Zharkynbek Orynbasar (about.html + instructors.html)

| Тег / требование | Файл:строка |
|---|---|
| section | about.html:40 |
| article | about.html:28; instructors.html ⚠️ (было :34, :43 — проверить после обновления файла) |
| aside | about.html — ⚠️ **нет ни в about.html, ни в instructors.html** |
| figure + figcaption | about.html — ⚠️ нет; instructors.html ⚠️ (есть figcaption без img) |
| 3 картинки с alt | ⚠️ **0 из 3 — ни одной реальной img на обеих страницах** |
| table (caption/thead/tbody/th scope) | instructors.html ⚠️ (было :65–86, пересчитать) |
| вложенный список (ol > ul) | instructors.html ⚠️ (было :54–63) |
| ol с атрибутом | instructors.html ⚠️ (было :54, type="A") |
| dl | about.html:42 |
| внешняя ссылка target+rel | instructors.html ⚠️ (было :99) |
| mailto / tel | instructors.html ⚠️ (было :96) |
| 2 ссылки на id на одной странице | instructors.html — ⚠️ есть только якоря-цели (:31, :53), самих ссылок на них нет |
| strong, em, b, i, small | about.html — ⚠️ нет strong/em/b/i/small вообще; instructors.html ⚠️ (было есть) |
| sub/sup | ⚠️ **нет ни на одной из двух страниц** |
| 2× abbr title | instructors.html ⚠️ (было :38, дважды на одной строке) |
| blockquote с реальной цитатой | about.html:32 — ⚠️ текст цитаты пустой `«[Цитата]»`, не настоящая |
| q | about.html:37; instructors.html ⚠️ (было :92) |
| cite (тег) | ⚠️ **нигде не найден как тег** — есть только пустой атрибут `cite=""` |
| hr, br | instructors.html ⚠️ (было :94, :96) |
| 4 разные HTML-сущности | instructors.html ⚠️ (было &laquo; &raquo; &mdash; — это 3, нужна 4-я) |
| code, pre, kbd, samp | colophon.html — строки не проверены в этой сессии |

## Требуется в сумме — Abdurrakhim Yestaiuly (price.html + schedule.html)

| Тег / требование | Файл:строка |
|---|---|
| section | schedule.html:42, :60(aside, не считается) — фактически только 1 section, нужен 2-й |
| article | schedule.html:34 |
| aside | schedule.html:60 |
| figure + figcaption, 3 фото с alt | schedule.html:66,70,74 (figcaption); img на тех же строках — есть, с содержательным alt |
| table (caption/thead/tbody/th scope) | price.html:30–39 |
| вложенный список | schedule.html:44,46,52 |
| ol с атрибутом | price.html:58 (start="1") |
| dl | — не требуется этой паре |
| внешняя ссылка target+rel | schedule.html:88, :89 |
| mailto / tel | schedule.html:86 — ⚠️ href почты написан как `href="maildriveschool@mail.kz"`, без `mailto:` и `@` в адресе — это не рабочая ссылка, исправить на `mailto:info@driveschool.kz` |
| 2 ссылки на id | schedule.html:90 (#practice-section, #schedule-top) |
| strong, em, b, i | schedule.html:37,39 |
| 2× abbr title | schedule.html:47,54 |
| blockquote с реальной цитатой | schedule.html:80–83 — реальная цитата с именем и датой, засчитывается |
| q | schedule.html:84 |
| 4 разные HTML-сущности | schedule.html:86,87,90 — &mdash; &laquo; &raquo; &middot; = 4, засчитывается |
| форма (полный набор требований) | price.html:65–99 — все элементы на месте (text/email/tel/number/date, radio, checkbox, select, textarea, required, placeholder, submit, reset) |

## Требуется в сумме — Adilbek Nurasyl (contacts.html + fleet.html)

| Тег / требование | Файл:строка |
|---|---|
| section | contacts.html:47, :79; fleet.html:53 |
| article | contacts.html:34 |
| aside | contacts.html:43 |
| figure + figcaption, 3 фото с alt | fleet.html:54,58,62 — img есть, но alt противоречит figcaption (см. открытые пункты) |
| table (caption/thead/tbody/th scope) | fleet.html:30–36 |
| вложенный список | contacts.html:56,58 |
| ol с атрибутом | contacts.html:56 (type="1") |
| dl | contacts.html:49 |
| внешняя ссылка target+rel | fleet.html:69 |
| mailto / tel | contacts.html:36,37 |
| 2 ссылки на id | fleet.html:72 (#photos, #fleet-top) |
| strong, em, b, i, small, sup | contacts.html:39,40,44 |
| mark | ⚠️ **отсутствует в contacts.html — требование не выполнено** |
| 2× abbr title | ⚠️ **не найден ни один `<abbr>` в contacts.html или fleet.html** |
| blockquote с реальной цитатой | contacts.html:67–70 — дата указана без года ("21 июль"), привести к формату остальных цитат |
| q, cite | contacts.html:72 (q есть); cite (тег) ⚠️ не найден |
| hr, br | contacts.html:74 |
| 4 разные HTML-сущности | contacts.html:76,77 — &laquo; &raquo; &mdash; &nbsp; = 4, засчитывается |
| форма | contacts.html:82–121 — все элементы на месте |

## Открытые пункты (обновлено по итогам проверки)

- **Форма Zharkynbek** всё ещё не добавлена ни на `about.html`, ни на `instructors.html`.
- **`instructors.html`** нужно прислать заново актуальную версию — текущая обрывается без footer/`</html>`, фото отсутствуют как `<img>`.
- **`fleet.html`**: ссылка в nav ведёт на `prices.html`, реального файла с таким именем нет (правильно — `price.html`) — 5 штрафных баллов за битую ссылку, если не исправить.
- **`fleet.html`**: alt-тексты противоречат figcaption (Chevrolet/Nexia, "Chevrole]"/Cobalt — опечатка и нестыковка марки).
- **`<cite>` как тег не используется нигде на сайте** — только пустые `cite=""` атрибуты у blockquote. Оба требования ("q, cite") нужно перечитать — возможно, нужен настоящий `<cite>` рядом с блочными цитатами (например, вокруг имени автора цитаты).
- **`<mark>`** отсутствует в `contacts.html`, хотя числится обязательным для пары Adilbek.
- **`<abbr>` дважды** — не найден ни один экземпляр в `contacts.html`/`fleet.html`, хотя числится обязательным для пары Adilbek.
- **`about.html`**: цитата ещё плейсхолдер `«[Цитата]»` — заменить на реальную с именем и датой, иначе весь blockquote не засчитается.
- **`about.html`**: нет aside, figure/figcaption, strong/em/b/i/small, sub/sup — крупный пробел относительно чек-листа пары.
- **Комментарии «почему»**: реально по одному найдено только в `schedule.html` и новом `index.html`; остальные шесть страниц нуждаются минимум в одном.
- Пустые атрибуты `cite=""` в blockquote — заполнить реальным источником или убрать.
