<?php

namespace Database\Seeders;

use App\Models\ResultType;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;
use RuntimeException;
use ZipArchive;

class ResultTypeSeeder extends Seeder
{
    private const SourceWorkbook = 'final_quiz_info.xlsx';

    private const ResultTypeSheet = 'xl/worksheets/sheet5.xml';

    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $baseTypesByCode = [];
        $baseTypeSortOrder = 1;
        $branchSortOrders = [];

        foreach ($this->rows() as $row) {
            if ($row['parent_code'] !== '') {
                continue;
            }

            $baseType = ResultType::query()->updateOrCreate(
                ['slug' => Str::slug($row['name'])],
                [
                    ...$this->attributesFor($row),
                    'parent_id' => null,
                    'sort_order' => $baseTypeSortOrder++,
                ],
            );

            $baseTypesByCode[$row['code']] = $baseType;
            $branchSortOrders[$row['code']] = 1;
        }

        foreach ($this->rows() as $row) {
            if ($row['parent_code'] === '') {
                continue;
            }

            $parentCode = $row['parent_code'];
            $parent = $baseTypesByCode[$parentCode] ?? null;

            if (! $parent instanceof ResultType) {
                throw new RuntimeException("Missing parent result type for code [{$parentCode}].");
            }

            ResultType::query()->updateOrCreate(
                ['slug' => Str::slug($row['name'])],
                [
                    ...$this->attributesFor($row),
                    'parent_id' => $parent->id,
                    'sort_order' => $branchSortOrders[$parentCode]++,
                ],
            );
        }
    }

    /**
     * @param  array{
     *     name: string,
     *     code: string,
     *     description: string,
     *     breadth: string,
     *     depth: string,
     *     integration: string,
     *     output: string,
     *     recognition: string,
     *     parent_code: string,
     *     base_color: string,
     *     accent_color?: string
     * }  $row
     * @return array<string, mixed>
     */
    private function attributesFor(array $row): array
    {
        $breadth = $this->dimensionFrom($row['breadth']);
        $depth = $this->dimensionFrom($row['depth']);
        $integration = $this->dimensionFrom($row['integration']);
        $output = $this->dimensionFrom($row['output']);
        $recognition = $this->dimensionFrom($row['recognition']);

        return [
            'name' => $row['name'],
            'description' => $row['description'],
            'breadth_percentage' => $breadth['percentage'],
            'breadth_description' => $breadth['description'],
            'output_percentage' => $output['percentage'],
            'output_description' => $output['description'],
            'depth_percentage' => $depth['percentage'],
            'depth_description' => $depth['description'],
            'recognition_percentage' => $recognition['percentage'],
            'recognition_description' => $recognition['description'],
            'integration_percentage' => $integration['percentage'],
            'integration_description' => $integration['description'],
            'base_color' => $this->colorFrom($row['base_color']),
            'accent_color' => $this->colorFrom($row['accent_color'] ?? $row['base_color']),
            'graph_path' => $this->graphPathFor($row),
        ];
    }

    /**
     * @return array{percentage: int, description: string}
     */
    private function dimensionFrom(string $value): array
    {
        if (preg_match('/^\s*(\d+)%\s*(.+)$/s', $value, $matches) !== 1) {
            throw new RuntimeException("Could not parse dimension value [{$value}].");
        }

        return [
            'percentage' => (int) $matches[1],
            'description' => trim(preg_replace('/\s+/', ' ', $matches[2]) ?? $matches[2]),
        ];
    }

    private function colorFrom(string $value): string
    {
        $color = trim($value);

        return str_starts_with($color, '#') ? $color : "#{$color}";
    }

    /**
     * @param  array{code: string, parent_code: string}  $row
     */
    private function graphPathFor(array $row): string
    {
        $code = $this->assetCodeFor($row['code']);

        if ($row['parent_code'] === '') {
            return "/assets/base_types/{$code}.svg";
        }

        return "/assets/result_categories/{$code}.svg";
    }

    private function assetCodeFor(string $code): string
    {
        return match ($code) {
            'ASSIGNED_SPEICALIST' => 'ASSIGNED_SPECIALIST',
            'active_syntehesizer' => 'active_synthesizer',
            'integrated_architect' => 'integrated_acrchitect',
            default => $code,
        };
    }

    /**
     * @return array<int, array{
     *     name: string,
     *     code: string,
     *     description: string,
     *     breadth: string,
     *     depth: string,
     *     integration: string,
     *     output: string,
     *     recognition: string,
     *     parent_code: string,
     *     base_color: string,
     *     accent_color?: string
     * }>
     */
    private function rows(): array
    {
        $spreadsheetRows = $this->spreadsheetRows();

        if ($spreadsheetRows !== []) {
            return $spreadsheetRows;
        }

        return [
            [
                'name' => 'Linear Specialist',
                'code' => 'linear_specialist',
                'description' => "Here energy flows through a single, well-defined channel. You have found your place in one domain and built there with precision and commitment. The world of multiple paths does not call to them, or if it once did, they ave made peace with where they stand. There is no deficit in this. The specialist's clarity is its own form of mastery, and their depth creates value that breadth cannot replicate.",
                'breadth' => '25%   Your interests concentrate in one or two areas. You do not experience the pull of many directions as a loss because your chosen path provides sufficient depth and reward. The narrowness is deliberate, not accidental.',
                'depth' => '85%   You pursue skills to a level where they become reliable, visible, and valuable. The commitment to going deep is your primary strength. You are not dabbling; you are building.',
                'integration' => '20%   Your skills do not need to connect across domains because they do not span domains. Integration is irrelevant when the work itself is whole. You have made a single territory your home.',
                'output' => '70%   You produce consistently within your domain. The output may not be flashy, but it is steady and it compounds. Your work has a rhythm that sustains itself.',
                'recognition' => '80%   You are known for what you do. The title, the credential, or the reputation matches the work. There is little gap between capability and visibility. You have earned your place.',
                'parent_code' => '',
                'base_color' => '#6FB9FF',
            ],
            [
                'name' => 'Contented Specialist',
                'code' => 'CONTENTED_SPECIALIST',
                'description' => 'You have found your place and you have built there with precision. The single path you walk is not a limitation; it is a choice that has yielded mastery. You do not wonder about other roads because the one you are on provides everything you need: depth, stability, recognition, and the quiet satisfaction of knowing exactly who you are.',
                'breadth' => '20%   Your interests concentrate in one or two areas. You do not experience the pull of many directions as a loss because your chosen path provides sufficient depth and reward.',
                'depth' => '90%   You pursue skills to a level where they become reliable, visible, and valuable. The commitment to going deep is your primary strength.',
                'integration' => '15%   Your skills do not need to connect across domains because they do not span domains. Integration is irrelevant when the work itself is whole.',
                'output' => '50%   You produce consistently within your domain. The output may not be flashy, but it is steady and it compounds.',
                'recognition' => '75%   You are known for what you do. The title, the credential, or the reputation matches the work. There is little gap between capability and visibility.',
                'parent_code' => 'linear_specialist',
                'base_color' => '#00395D',
            ],
            [
                'name' => 'Assigned Specialist',
                'code' => 'ASSIGNED_SPEICALIST',
                'description' => 'Your path was chosen for you, or you chose it before you knew yourself well enough to choose. You are capable, even successful, but the specialization feels inherited rather than elected. The question of what else you might have done does not surface often, but when it does, it lingers longer than you admit.',
                'breadth' => '15%   Your range is narrow by design or by default. You have not seriously explored alternatives because the current path demands all your energy.',
                'depth' => '80%   You have developed real capability, though it may feel more like obligation than passion. The depth is genuine but not always joyful.',
                'integration' => '10%   Your skills do not cross boundaries because your life does not cross boundaries. Integration is irrelevant when the path is singular and the pressure to stay on it is constant.',
                'output' => '25%   You produce adequately, sometimes well. The output sustains your position but may not express your full self.',
                'recognition' => '100%   You are seen, but not always for who you are. The recognition attaches to your role or your title more than to your personal choice.',
                'parent_code' => 'linear_specialist',
                'base_color' => '#00395D',
            ],
            [
                'name' => 'Settling Generalist',
                'code' => 'SETTLING_GENERALIST',
                'description' => 'You once moved more freely across domains, but you have gradually narrowed your range. Whether by choice or by exhaustion, you have consolidated into a more manageable path. The broader curiosity is still there, dormant, but you no longer feed it. You have made peace with less, or you have told yourself that less is enough.',
                'breadth' => '16%   Your range is moderate but shrinking. You remember when you explored more widely, and some part of you misses it.',
                'depth' => '35%   You have functional competence in a few areas, but you rarely push toward mastery. Depth feels like a luxury you no longer have time for.',
                'integration' => '17%   Your skills mostly operate independently. There was a time when you saw connections, but that vision has faded.',
                'output' => '15%   You produce intermittently, in bursts followed by quieter periods. The output is reliable enough to maintain your position but not ambitious enough to expand it.',
                'recognition' => '35%   You are known for a general competence rather than a specific excellence. The recognition is moderate, comfortable, and slightly hollow.',
                'parent_code' => 'linear_specialist',
                'base_color' => '#00395D',
            ],
            [
                'name' => 'Emerging Explorer',
                'code' => 'emerging_explorer',
                'description' => 'Something in them is waking up. The curiosity that was compressed, ignored, or postponed is beginning to push against the edges of their single path. They are not yet a polymath, but they are no longer comfortably a specialist. The emergence is fragile. It needs protection, space, and permission to continue.',
                'breadth' => '65%   Your interests are wider than your life currently allows. New domains are calling to you, and you are beginning to answer. The range is expanding, though it may not yet be visible to others.',
                'depth' => '35%   You have depth in one area, but it feels less satisfying than it once did. The pull toward new territories is stronger than the pull toward deeper mastery of the old one.',
                'integration' => '30%   The connections between your interests exist in your mind but not yet in your work. They are private patterns, early glimpses of what could be. You see the bridges but have not yet walked them.',
                'output' => '25%   What you create is still concentrated in your primary domain. The new interests have not yet produced tangible results. Output is the lagging indicator of your internal expansion.',
                'recognition' => '20%   You are still seen for your primary skill. The emerging self is invisible to the systems that validate identity. You have not yet claimed the new territories publicly.',
                'parent_code' => '',
                'base_color' => '#F3BE26',
            ],
            [
                'name' => 'Suppressed Explorer',
                'code' => 'SUPPRESSED_EXPLORER',
                'description' => 'Your curiosity is alive but constrained. External systems-family expectations, economic pressure, cultural norms, or institutional gatekeeping-have compressed your exploration into private margins. You think about other paths constantly but rarely walk them. The polymath in you is not absent; it is held in reserve, waiting for permission you may never receive.',
                'breadth' => '70%   Your interests are wide, perhaps wider than you acknowledge publicly. You follow multiple domains in your mind, through books, through conversations, through quiet observation.',
                'depth' => '20%   You have gone deep enough in one area to survive or succeed, but the depth feels like a cage. Your true capacity is distributed across interests you cannot fully pursue.',
                'integration' => '10%   The connections between your interests exist in private. You see how your domains could speak to each other, but you do not act on those connections.',
                'output' => '10%   What you create is limited to your primary domain. The other interests produce nothing tangible. Output is the proof of your suppression.',
                'recognition' => '10%   You are seen for one thing, or for nothing at all. The broader self is invisible to the systems that validate identity.',
                'parent_code' => 'emerging_explorer',
                'base_color' => '#6D3E00',
            ],
            [
                'name' => 'Contained Polymath',
                'code' => 'CONTAINED_POLYMATH',
                'description' => 'You contain multitudes, but you contain them carefully. Your polymathic nature is real but managed, kept within boundaries that feel safe or necessary. You may have learned early that breadth is punished, or you may have punished yourself for it. The result is the same: a rich inner life that does not fully express itself in your outer work.',
                'breadth' => '80%   Your range is wider than your life suggests. You maintain interests across domains but in controlled doses. The breadth is genuine but rationed.',
                'depth' => '30%   You have moderate depth in a few areas, but you stop before reaching mastery. The stopping is strategic, not lazy.',
                'integration' => '27%   You see connections but do not build them. The integration is conceptual, not practical. You understand how your skills could combine, but the combination feels too risky.',
                'output' => '28%   You produce selectively, almost cautiously. The output is competent but not bold. You hold back because you are not sure which domain to commit to.',
                'recognition' => '27%   You are known for a general capability rather than a specific achievement. The recognition is vague, polite, and slightly frustrating.',
                'parent_code' => 'emerging_explorer',
                'base_color' => '#6D3E00',
            ],
            [
                'name' => 'Active Synthesizer',
                'code' => 'active_syntehesizer',
                'description' => 'They are in motion, and the motion is real. Skills are accumulating, connections are forming, and something like a system is beginning to emerge. But the synthesis is not yet stable. They are actively building the bridge between knowing and doing, between private curiosity and public creation. The fragmentation is giving way to coherence, though the coherence is still partial.',
                'breadth' => '75%   You touch many domains, and the touch is becoming more deliberate. The range is genuine and growing. You are no longer just sampling; you are beginning to inhabit multiple territories.',
                'depth' => '45%   Depth is inconsistent but present. You have gone deep enough in enough areas to generate real capability, though not yet mastery. The distribution is uneven, but it is real.',
                'integration' => '55%   Your skills are beginning to talk to each other. The connections are not yet automatic, but they are no longer accidental. You are deliberately building the bridge between domains.',
                'output' => '40%   Output is the bottleneck, but it is no longer blocked. You create, though inconsistently. The work is scattered across domains, but it is work. The gap between imagination and production is narrowing.',
                'recognition' => '30%   You struggle to name what you do because what you do is still in formation. The lack of a clear label is a temporary condition, not a permanent identity. You are becoming something that does not yet have a name.',
                'parent_code' => '',
                'base_color' => '#FF2B2B',
            ],
            [
                'name' => 'Perfectionist Dropper',
                'code' => 'PERFECTIONIST_DROPPER',
                'description' => 'You start with intensity and abandon when difficulty demands long-term commitment. The barrier is not lack of interest but fear of imperfection, of falling short of an internalized standard of expertise. Your polymathic potential is real, but it is filtered through a performance trap that values only finished, polished outcomes. You are blocked not by inability but by the gap between your vision and your tolerance for imperfect execution.',
                'breadth' => '100%   Your range is wide and genuine. You are drawn to many domains and you enter them with enthusiasm. The breadth is not the problem; the problem is what happens when the initial excitement fades.',
                'depth' => "11%   Depth is where you falter. You reach a point where mastery requires repetition, failure, and incremental progress, and you stop. The stopping is not laziness; it is a perfectionist's paralysis.",
                'integration' => '10%   Your skills do not connect because they do not survive long enough to connect. Integration requires sustained engagement across domains, and sustained engagement is what you avoid.',
                'output' => '12%   Output is minimal. You have many beginnings and few endings. The unfinished work accumulates in private, evidence of potential that never fully arrives.',
                'recognition' => '10%   You are largely invisible. The lack of output means there is nothing to recognize. You may feel like a fraud not because you lack ability but because you lack evidence.',
                'parent_code' => 'active_syntehesizer',
                'base_color' => '#720000',
            ],
            [
                'name' => 'Passive Accumulator',
                'code' => 'PASSIVE_ACCUMULATOR',
                'description' => 'You learn voraciously and create sparingly. Knowledge accumulates without direction or output. The pleasure is in acquisition, not application. You may feel secretly wealthy in understanding while appearing inactive to others. The bridge from knowing to doing remains unbuilt, not because you cannot build it, but because building it was never the point. You are a collector of capabilities, not a deployer of them.',
                'breadth' => '20%   Your range is extensive, perhaps exhaustive. You have sampled widely and accumulated a vast internal library. The breadth is your pride and your hiding place.',
                'depth' => '80%   Depth is shallow across the board. You know enough to discuss, to appreciate, to navigate, but not enough to build, to teach, or to lead.',
                'integration' => '21%   Your knowledge does not cohere. It sits in separate compartments, accessible but not connected. Integration would require application, and application is not your mode.',
                'output' => '31%   Output is minimal to nonexistent. You consume far more than you produce. The ratio of learning to creating is heavily skewed toward consumption.',
                'recognition' => '29%   You are invisible. There is nothing public to recognize, and your private knowledge does not translate into visible credibility.',
                'parent_code' => 'active_syntehesizer',
                'base_color' => '#720000',
            ],
            [
                'name' => 'Drifting Aspirant',
                'code' => 'DRIFTING_ASPIRANT',
                'description' => 'You move between interests without accumulating depth or coherence. The drift may follow trends, escapism, or a vague sense that something better exists elsewhere. Without an anchor or direction, your breadth becomes circular rather than compounding. You are not building a polymathic system; you are fleeing from commitment. The aspiration is real, but it is disconnected from the discipline required to realize it.',
                'breadth' => '80%   Your range is moderate to wide, but it is reactive, not strategic. You follow what is interesting in the moment, then abandon it when the next interest appears.',
                'depth' => '27%   Depth is minimal. You rarely stay long enough in any domain to develop real capability. The shallowness is not a choice but a consequence of perpetual motion.',
                'integration' => '10%   There is nothing to integrate. Your skills are fragments, not a mosaic. The absence of integration is the natural result of never staying anywhere long enough to build.',
                'output' => '26%   Output is scarce and disconnected. What you produce does not accumulate into a body of work. Each project is an island, and the islands do not form an archipelago.',
                'recognition' => '09%   You are not known for anything specific. The recognition you might receive is diluted across too many abandoned paths. You are a ghost in your own career.',
                'parent_code' => 'active_syntehesizer',
                'base_color' => '#720000',
            ],
            [
                'name' => 'Integrated Architect',
                'code' => 'integrated_architect',
                'description' => 'Their skills have found each other. What once felt like scattered interests now operates as a coherent system. They do not choose between domains; they move through them. The integration is visible not only to them but to others, though it may not yet have a name or a credential. They are not a jack of all trades. They are a master of the connections between them.',
                'breadth' => '70%   Your range is wide but not chaotic. You maintain active competence in multiple domains and do not feel the need to shrink yourself to fit a single category. The breadth is managed, not manic.',
                'depth' => '75%   You have gone deep enough in enough areas to generate real capability. Depth is distributed, not concentrated, but it is real. You are not an expert in everything, but you are expert in the spaces between.',
                'integration' => '85%   This is your center. You deliberately apply what you know from one domain to another. The connections are not accidental; they are designed. You build systems that others cannot see until you show them.',
                'output' => '70%   You produce across domains. The output may take unusual forms-projects that cross boundaries, work that resists categorization-but it is tangible and it is yours. The creation is consistent and it is compound.',
                'recognition' => '50%   You may or may not be formally validated for your breadth. The recognition you have is often self-generated, earned through demonstrated work rather than inherited titles. You are known for what you build, not for the box you fit in.',
                'parent_code' => '',
                'base_color' => 'A622E7',
            ],
            [
                'name' => 'Systemic Weaver',
                'code' => 'SYSTEMIC_WEAVER',
                'description' => 'You hold a vision of how your skills connect, and you actively weave them into coherent systems. Whether through teaching, building, or organizing, you create structures that let others see the connections you see. Your polymathy is centripetal-it pulls disparate elements toward unity. You are not just integrated; you are an integrator, a translator between domains that others thought were separate.',
                'breadth' => '84%   Your range is wide but purposeful. You do not accumulate domains randomly; you gather them strategically, knowing how each will serve the larger system you are building.',
                'depth' => '75%   You have gone deep enough in enough areas to generate real authority. The depth is distributed where it matters, concentrated at the nodes where your domains intersect.',
                'integration' => '81%   This is your genius. You see patterns across domains that others miss, and you build bridges that others can walk. Integration is not an accident; it is your primary craft.',
                'output' => '98%   You produce work that crosses boundaries. The output is tangible, shareable, and often educational. You do not just create; you create systems that enable others to create.',
                'recognition' => '26%   You are known for your ability to connect. The recognition may not be mainstream, but it is deep. The people who understand what you do value it highly.',
                'parent_code' => 'integrated_architect',
                'base_color' => '#390B50',
            ],
            [
                'name' => 'Survival Synthesizer',
                'code' => 'SURVIVAL_SYNTHESIZER',
                'description' => 'Your integration emerged from necessity, not luxury. Limited resources, unstable environments, or multiple responsibilities forced you to combine skills creatively. Your polymathy is hard-won and pragmatic. You may not call it polymathy-you call it getting by-but the result is the same: a body of capabilities that works as a system because it had to. You are proof that integration can be born from pressure, not just from privilege.',
                'breadth' => '80%   Your range is wide because survival demanded it. You learned what you needed to learn, when you needed to learn it. The breadth is not decorative; it is functional.',
                'depth' => '81%   You have solid capability in multiple areas, though not always mastery. The depth is sufficient for the task at hand, and the task at hand has often been urgent.',
                'integration' => '85%   Your skills connect because they must. When resources are scarce, combining what you know is not a luxury; it is a necessity. Integration is your survival mechanism.',
                'output' => '80%   You produce consistently, though not always in forms that others recognize as professional. The output is practical, immediate, and often invisible to systems that value credentials over results.',
                'recognition' => '61%   You are under-recognized. The systems that validate expertise often miss those who built their expertise outside formal channels. Your capability is real, but the validation of it is incomplete.',
                'parent_code' => 'integrated_architect',
                'base_color' => '#390B50',
            ],
            [
                'name' => 'Serial Builder',
                'code' => 'SERIAL_BUILDER',
                'description' => 'You develop skills intensely, one at a time, but each builds on the last. Your depth is serial rather than simultaneous. The result is a stacked expertise that appears broad from the outside but feels like a single, continuous project to you. You are a polymath in time, not in parallel. Each domain you enter is informed by the previous one, and the sequence creates a coherence that simultaneous breadth cannot replicate.',
                'breadth' => '80%   Your range is wide but accumulated sequentially, not simultaneously. You do not juggle domains; you sequence them. The breadth is the sum of a lifetime of deep dives.',
                'depth' => '76%   You go deep in every domain you enter. The depth is your signature. You do not sample; you master, then move on, carrying the mastery with you.',
                'integration' => '80%   Your skills connect through time. Each new domain is informed by the previous ones. The integration is historical, not spatial. You build a chain of expertise where each link strengthens the others.',
                'output' => '79%   You produce at a high level across domains. The output is substantial, polished, and often recognized. You finish what you start, and you start what matters.',
                'recognition' => '27%   You are known for excellence, though the recognition may attach to different domains at different times. The cumulative reputation is strong, even if it is distributed across a career that resists single-label summary.',
                'parent_code' => 'integrated_architect',
                'base_color' => '#390B50',
            ],
            [
                'name' => 'Transformative polymath',
                'code' => 'transformative_polymath',
                'description' => 'They have moved beyond integration into transformation. Their polymathy is not just a personal configuration; it is a force that changes the territories it touches. You create new fields by merging old ones. They see connections that reshape the landscape. The polymath in them is not content to inhabit existing domains-they redesign the map itself. This is rare. This is not a goal for everyone. But for them, it is the natural outcome of a lifetime of building bridges that others did not know were needed.',
                'breadth' => '85%   Your range is extensive and still expanding. You do not fear new territories; you seek them. The breadth is not scattered but strategic. You know which domains to enter and when.',
                'depth' => '90%   You have gone deep in multiple areas, deep enough to generate not just capability but authority. The depth is not distributed thinly; it is concentrated where it matters and connected where it creates force.',
                'integration' => '95%   Integration is no longer something you do. It is something you are. The connections between your skills are so natural that you no longer notice them. Others do. They see a coherence that they cannot explain.',
                'output' => '88%   You produce at a scale and across boundaries that resist categorization. The output is not just work; it is new territory. You create things that did not exist before you made them.',
                'recognition' => '82%   You are known, though perhaps not in traditional ways. The recognition may be niche, late, or unconventional, but it is real. You have earned it not by fitting in but by creating spaces that others now inhabit.',
                'parent_code' => '',
                'base_color' => '#96C016',
            ],
            [
                'name' => 'Systems Architect',
                'code' => 'SYSTEMS_ARCHITECT',
                'description' => 'You have moved beyond personal integration into systemic transformation. Your polymathy is not just a configuration of skills; it is a force that redesigns the territories it touches. You create new fields by merging old ones, new methods by combining existing ones, new possibilities by seeing what others cannot yet see. The architect in you does not just inhabit systems; you redesign them. This is rare. This is not a goal for everyone. But for you, it is the natural outcome of a lifetime of building bridges that others did not know were needed.',
                'breadth' => '90%    Your range is extensive and strategic. You know which domains to enter, when to enter them, and how they will serve the larger system you are designing. The breadth is not accumulation; it is architecture.',
                'depth' => '91%   You have gone deep in multiple areas, deep enough to generate not just capability but authority. The depth is concentrated at the intersections, where it creates force that single-domain expertise cannot match.',
                'integration' => '89%   Integration is not something you do; it is something you are. The connections between your skills are so natural that you no longer notice them. Others do. They see a coherence that they cannot explain.',
                'output' => '90%   You produce at a scale and across boundaries that resist categorization. The output is not just work; it is new territory. You create things that did not exist before you made them.',
                'recognition' => '80%   You are known, though perhaps not in traditional ways or on traditional timelines. The recognition may be niche, late, or unconventional, but it is real and it is earned. You have built spaces that others now inhabit.',
                'parent_code' => 'transformative_polymath',
                'base_color' => '#38470A',
            ],
        ];
    }

    /**
     * @return array<int, array{
     *     name: string,
     *     code: string,
     *     description: string,
     *     breadth: string,
     *     depth: string,
     *     integration: string,
     *     output: string,
     *     recognition: string,
     *     parent_code: string,
     *     base_color: string,
     *     accent_color: string
     * }>
     */
    private function spreadsheetRows(): array
    {
        $path = base_path(self::SourceWorkbook);

        if (! is_file($path)) {
            return [];
        }

        $zip = new ZipArchive();

        if ($zip->open($path) !== true) {
            throw new RuntimeException('Unable to open result type workbook.');
        }

        $sharedStrings = $this->sharedStringsFrom($zip);
        $sheetXml = $zip->getFromName(self::ResultTypeSheet);

        if ($sheetXml === false) {
            throw new RuntimeException('Unable to find the result type sheet in the workbook.');
        }

        $sheet = simplexml_load_string($sheetXml);

        if ($sheet === false) {
            throw new RuntimeException('Unable to parse the result type sheet.');
        }

        $rows = [];

        foreach ($sheet->sheetData->row as $sheetRow) {
            $cells = $this->cellsFrom($sheetRow, $sharedStrings);
            $name = trim($cells['A'] ?? '');

            if ($name === '' || strcasecmp($name, 'Branch') === 0) {
                continue;
            }

            $rows[] = [
                'name' => $name,
                'code' => trim($cells['B'] ?? ''),
                'description' => trim($cells['C'] ?? ''),
                'breadth' => trim($cells['D'] ?? ''),
                'depth' => trim($cells['E'] ?? ''),
                'integration' => trim($cells['F'] ?? ''),
                'output' => trim($cells['G'] ?? ''),
                'recognition' => trim($cells['H'] ?? ''),
                'parent_code' => trim($cells['I'] ?? ''),
                'base_color' => trim($cells['K'] ?? ''),
                'accent_color' => trim($cells['L'] ?? ($cells['K'] ?? '')),
            ];
        }

        return $rows;
    }

    /**
     * @return array<int, string>
     */
    private function sharedStringsFrom(ZipArchive $zip): array
    {
        $xml = $zip->getFromName('xl/sharedStrings.xml');

        if ($xml === false) {
            return [];
        }

        $sharedStrings = simplexml_load_string($xml);

        if ($sharedStrings === false) {
            throw new RuntimeException('Unable to parse workbook shared strings.');
        }

        $values = [];

        foreach ($sharedStrings->si as $sharedString) {
            $parts = [];

            if (isset($sharedString->t)) {
                $parts[] = (string) $sharedString->t;
            }

            foreach ($sharedString->r as $run) {
                $parts[] = (string) $run->t;
            }

            $values[] = implode('', $parts);
        }

        return $values;
    }

    /**
     * @param  array<int, string>  $sharedStrings
     * @return array<string, string>
     */
    private function cellsFrom(mixed $sheetRow, array $sharedStrings): array
    {
        $cells = [];

        foreach ($sheetRow->c as $cell) {
            $reference = (string) $cell['r'];
            $column = preg_replace('/[0-9]/', '', $reference) ?? '';
            $value = (string) $cell->v;

            if ((string) $cell['t'] === 's') {
                $value = $sharedStrings[(int) $value] ?? $value;
            }

            $cells[$column] = $value;
        }

        return $cells;
    }
}
