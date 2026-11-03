#!/usr/bin/env python3
"""Candidate bibliographic lookup helper for M3 verification (not an auto-importer)."""

from __future__ import annotations

import json
import ssl
import urllib.parse
import urllib.request

QUERIES = [
    "ExpressEar Sensing Fine-Grained Facial Expressions with Earables",
    "Exploring Semi-Supervised Learning for Predicting Listener Backchannels",
    "Feature Extraction and Selection for Emotion Recognition from Electrodermal Activity Shukla",
    "HaptiDrag Device with the Ability to Generate Varying Levels of Drag",
    "Opacity, Transparency, and the Ethics of Affective Computing",
    "Robot Assisted Interventions for Individuals with Intellectual Disabilities Shukla",
    "SPASHT: Semantic and PrAgmatic SpeecH Features for AuTomatic Assessment of Autism",
    "It looks useful, works just fine, but will it replace me Understanding Special Educators",
    "MobiTangibles Enabling Virtual Hand-Held Tools Miniature Control",
    "Ethical Considerations from Child-Robot Interactions in Under-Resourced Communities",
    "Toy, Tutor, Peer, or Pet? Preliminary Findings from Child-Robot Interactions",
    "Mapping Robotic Affordances with Pre-requisite Learning Interventions",
    "Stakeholders Acceptance and Expectations of Robot-Assisted Therapy Autism",
    "AttentioNet Monitoring Student Attention Type EEG",
    "Responsiveness towards robot-assisted interactions among pre-primary children",
    "Effect of polite triggers in chatbot conversations RO-MAN",
]

KNOWN_DOIS = [
    "10.1145/3613904.3642836",  # CHI 2024 social robots HM candidate
    "10.1145/3467930",  # ExpressEar often
    "10.1145/3411764.3445366",  # CHI 2021 backchannels candidate
    "10.1109/TAFFC.2019.2904322",  # EDA emotion recognition candidate
]


def fetch(url: str) -> dict:
    ctx = ssl.create_default_context()
    req = urllib.request.Request(
        url, headers={"User-Agent": "HMI-Lab-Website/0.1 (mailto:hmi@iiitd.ac.in)"}
    )
    with urllib.request.urlopen(req, context=ctx, timeout=40) as resp:
        return json.load(resp)


def year_of(item: dict):
    for key in ("published-print", "published-online", "created"):
        parts = item.get(key, {}).get("date-parts")
        if parts:
            return parts[0][0]
    return None


def show_work(item: dict) -> None:
    authors = "; ".join(
        f"{a.get('given', '')} {a.get('family', '')}".strip() for a in item.get("author", [])
    )
    print(
        f"{year_of(item)} | {item.get('DOI')}\n"
        f"  {(item.get('title') or [''])[0]}\n"
        f"  {(item.get('container-title') or [''])[0]}\n"
        f"  {authors}\n"
        f"  type={item.get('type')} URL={item.get('URL')}"
    )


def main() -> None:
    for doi in KNOWN_DOIS:
        print(f"\n=== DOI {doi}")
        try:
            show_work(fetch(f"https://api.crossref.org/works/{urllib.parse.quote(doi)}")["message"])
        except Exception as exc:  # noqa: BLE001
            print("  ERROR", exc)

    for q in QUERIES:
        print(f"\n=== QUERY {q}")
        try:
            url = (
                "https://api.crossref.org/works?"
                + urllib.parse.urlencode({"query.bibliographic": q, "rows": 2})
            )
            items = fetch(url)["message"]["items"]
            for item in items:
                show_work(item)
        except Exception as exc:  # noqa: BLE001
            print("  ERROR", exc)


if __name__ == "__main__":
    main()
