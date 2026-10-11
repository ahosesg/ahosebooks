"""Rebuild the ebook's illustrative charts. Requires matplotlib; no external data."""
import json
from pathlib import Path
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt

ROOT = Path(__file__).resolve().parents[1]
DATA = json.loads((ROOT / 'src/data/chart-examples.json').read_text())
BG, INK, MUTED, GREEN, PALE = '#0F1713', '#F4F5F2', '#C9D7CD', '#3FAE68', '#DDEBDF'
plt.rcParams.update({'svg.fonttype': 'none', 'font.family': 'DejaVu Sans', 'font.size': 11,
                     'axes.labelcolor': MUTED, 'xtick.color': MUTED, 'ytick.color': INK})
fig = plt.figure(figsize=(7.2, 3.5), facecolor=BG)
ax = fig.add_axes([.23, .54, .68, .34], facecolor=BG)
fig.text(.04, .94, 'A · Cenários alternativos de total anual', color=INK, weight='bold', fontsize=11)
for y, item in enumerate(DATA['totals']):
    total = sum(item['parts'])
    left = 0
    for index, part in enumerate(item['parts']):
        ax.barh(y, part, left=left, height=.57, color=GREEN if index == 0 else PALE)
        if len(item['parts']) > 1:
            ax.text(left + part / 2, y, str(part), color=BG, ha='center', va='center', weight='bold', fontsize=10)
        left += part
    ax.text(total + 1.5, y, f'{total} t', color=INK, ha='left', va='center', weight='bold', fontsize=10)
ax.axvline(DATA['thresholdTonnes'], color=PALE, linestyle=(0, (4, 3)), linewidth=1.2, zorder=0)
ax.set_yticks(range(4), [item['label'] for item in DATA['totals']])
ax.invert_yaxis()
ax.set_xlim(0, 63)
ax.set_xticks([0, 25, 50])
ax.tick_params(axis='y', length=0, pad=8, labelsize=10)
ax.tick_params(axis='x', length=0, pad=4, labelsize=9)
ax.set_xlabel('Massa líquida anual (t)', fontsize=9, labelpad=2)
for spine in ax.spines.values(): spine.set_visible(False)
fig.text(.04, .40, 'B · Exemplo de acúmulo no ano', color=INK, weight='bold', fontsize=11)
ax2 = fig.add_axes([.23, .115, .68, .20], facecolor=BG)
points=DATA['cumulative']
ax2.axhline(DATA['thresholdTonnes'], color=PALE, linestyle=(0, (4, 3)), linewidth=1.2)
ax2.step([p['month'] for p in points], [p['tonnes'] for p in points], where='post', color=GREEN, linewidth=2.2,
         marker='o', markersize=6, markerfacecolor=GREEN)
for item in points:
    ax2.annotate(f"{item['tonnes']} t", (item['month'], item['tonnes']), xytext=(0, 7),
                 textcoords='offset points', ha='center', color=INK, weight='bold', fontsize=10)
ax2.set_xlim(.6, 11.5)
ax2.set_ylim(0, 72)
ax2.set_xticks([p['month'] for p in points], [p['label'] for p in points])
ax2.set_yticks([0, 50])
ax2.tick_params(length=0, pad=4, labelsize=9)
ax2.text(10.5, 50, 'limite\n50 t', va='center', ha='left', color=PALE, fontsize=9)
for spine in ax2.spines.values(): spine.set_visible(False)
fig.text(.04, .02, 'Ao ultrapassar 50 t, entram também as importações anteriores do mesmo ano.', color=MUTED, fontsize=9)
dest=ROOT / 'public/figures'
dest.mkdir(parents=True, exist_ok=True)
fig.savefig(dest / 'minimis.svg', format='svg', facecolor=BG, metadata={'Date': None, 'Creator': 'AHOS ESG'})
plt.close(fig)
print('Gráficos ilustrativos gerados a partir de chart-examples.json.')
