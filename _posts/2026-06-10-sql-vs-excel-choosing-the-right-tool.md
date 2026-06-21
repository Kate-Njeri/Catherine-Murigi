---
layout: post
title: "SQL vs. Excel: Choosing the Right Tool for the Analysis"
date: 2026-06-10
category: data
excerpt: "They're not competitors. They're suited to different stages of the same question, and mixing them up costs you time."
---

I still get asked, usually in interviews, whether I "prefer" SQL or Excel. The honest answer is that the question doesn't quite make sense to me anymore. They solve different problems, and most of the operations analysis I do uses both in the same afternoon.

## What SQL is actually for

SQL earns its keep the moment data lives in more than one table, or there's more of it than a spreadsheet can comfortably hold. If I need to join order records to shipment records to vendor records, and there are a few hundred thousand rows involved, that's a SQL job. It's also the right tool when the analysis needs to be repeatable — a query I write today should still produce the same correct answer in three months, run by someone else, without anyone needing to remember which cells had which formulas.

The tradeoff is friction. Writing a query, even a simple one, has more setup cost than opening a workbook. That cost is worth paying when the question is well-defined: "what's the average time between confirmation and pick for orders over $500 in the last quarter" is a SQL question, because the logic only needs to be written once and the result is unambiguous.

## What Excel is actually for

Excel wins when the question isn't fully formed yet. If I'm exploring a dataset for the first time, trying to find the shape of a problem before I know what I'm looking for, a pivot table lets me restructure the view in seconds in a way that would mean rewriting a query each time. It's also simply the format most stakeholders trust and can interrogate themselves — a well-built workbook with a clear pivot table is something a operations manager can poke at without asking me first.

The honest weakness is fragility. A workbook with five tabs of intermediate calculations is hard to audit, easy to break, and almost impossible to hand off cleanly. I've inherited enough of those to be wary of building my own.

## The pattern that actually works

In practice, the split looks like this: SQL pulls the clean, joined, deduplicated data. Excel (or Power BI, increasingly) is where that data gets explored, pivoted, and turned into something a non-analyst can act on. Treating SQL as the foundation and Excel as the surface keeps both tools doing what they're good at, instead of asking either one to do the other's job.

The question worth asking isn't which tool is better. It's which stage of the analysis you're actually in.
