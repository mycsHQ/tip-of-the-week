# Write better SQL queries

Element-api used to be slow to retrieve the list of elements.
How this query has been optimised ?

### The query

Note, the query is separated in 2 parts:

Part 1:

```sql
  selectColumns: [
    'elements.sku'
    'elements.furniture_type'
    'elements.section'
    'elements.type'
    'elements.material'
    'elements.color'
    'elements.length'
    'elements.width'
    'elements.height'
    'elements.weight'
    'elements.qty_per_box'
    'elements.scene_object_name'
    'elements.mapped_skus'
    'elements.version'

    ( ->
      @select('price')
        .from('elements_prices')
        .whereRaw('elements_prices.element_sku = elements.sku')
        .andWhere('elements_prices.country_code', '=', 'de')
        .as('price_de')),
    ( ->
      @select('price')
        .from('elements_prices')
        .whereRaw('elements_prices.element_sku = elements.sku')
        .andWhere('elements_prices.country_code', '=', 'at')
        .as('price_at')),
    ( ->
      @select('price')
        .from('elements_prices')
        .whereRaw('elements_prices.element_sku = elements.sku')
        .andWhere('elements_prices.country_code', '=', 'ch')
        .as('price_ch')),
    ( ->
      @select('price')
        .from('elements_prices')
        .whereRaw('elements_prices.element_sku = elements.sku')
        .andWhere('elements_prices.country_code', '=', 'fr')
        .as('price_fr')),
    ( ->
      @select('price')
        .from('elements_prices')
        .whereRaw('elements_prices.element_sku = elements.sku')
        .andWhere('elements_prices.country_code', '=', 'be')
        .as('price_be')),
    ( ->
      @select('price')
        .from('elements_prices')
        .whereRaw('elements_prices.element_sku = elements.sku')
        .andWhere('elements_prices.country_code', '=', 'nl')
        .as('price_nl')),
    ( ->
      @select('price')
        .from('elements_prices')
        .whereRaw('elements_prices.element_sku = elements.sku')
        .andWhere('elements_prices.country_code', '=', 'uk')
        .as('price_uk')),
    ( ->
      @select('shipping')
        .from('elements_shippings')
        .whereRaw('elements_shippings.element_sku = elements.sku')
        .andWhere('elements_shippings.country_code', '=', 'de')
        .as('shipping_de')),
    ( ->
      @select('shipping')
        .from('elements_shippings')
        .whereRaw('elements_shippings.element_sku = elements.sku')
        .andWhere('elements_shippings.country_code', '=', 'at')
        .as('shipping_at')),
    ( ->
      @select('shipping')
        .from('elements_shippings')
        .whereRaw('elements_shippings.element_sku = elements.sku')
        .andWhere('elements_shippings.country_code', '=', 'ch')
        .as('shipping_ch')),
    ( ->
      @select('shipping')
        .from('elements_shippings')
        .whereRaw('elements_shippings.element_sku = elements.sku')
        .andWhere('elements_shippings.country_code', '=', 'fr')
        .as('shipping_fr')),
    ( ->
      @select('shipping')
        .from('elements_shippings')
        .whereRaw('elements_shippings.element_sku = elements.sku')
        .andWhere('elements_shippings.country_code', '=', 'be')
        .as('shipping_be')),
    ( ->
      @select('shipping')
        .from('elements_shippings')
        .whereRaw('elements_shippings.element_sku = elements.sku')
        .andWhere('elements_shippings.country_code', '=', 'nl')
        .as('shipping_nl')),
    ( ->
      @select('shipping')
        .from('elements_shippings')
        .whereRaw('elements_shippings.element_sku = elements.sku')
        .andWhere('elements_shippings.country_code', '=', 'uk')
        .as('shipping_uk')),
    ( ->
      @select('inventory')
        .from('elements_inventories')
        .whereRaw('elements_inventories.element_sku = elements.sku')
        .as('inventory')),
    ( ->
      @select('refurbish_date')
        .from('elements_inventories')
        .whereRaw('elements_inventories.element_sku = elements.sku')
        .as('refurbish_date'))
   ]
```

Part 2:

```sql
  #
  # Fetch all elements together with their price, shipping and inventories information
  #
  # @return {promise}
  #
  findAll: ->
    @Knex(@tableName)
      .leftJoin('elements_prices', 'elements.sku', 'elements_prices.element_sku')
      .leftJoin('elements_shippings', 'elements.sku', 'elements_shippings.element_sku')
      .leftJoin('elements_inventories', 'elements.sku', 'elements_inventories.element_sku')
      .select(@selectColumns)
      .from(@tableName)
      .as('elements')
      .orderBy('elements.updated_at', 'desc')
      .groupBy('elements.sku')
```

#### First idea: join table looks suspicious

```sql
      .leftJoin('elements_prices', 'elements.sku', 'elements_prices.element_sku')
      .leftJoin('elements_shippings', 'elements.sku', 'elements_shippings.element_sku')
      .leftJoin('elements_inventories', 'elements.sku', 'elements_inventories.element_sku')
```

The query looks too expensive due to several `JOIN`.

With a closer look, the `elements_prices.*`, `elements_shippings.*` and `elements_inventories.*` are not even used in the list of selected columns to retrieved...

#### Analyze: EXPLAIN ANALYZE

Using the option `EXPLAIN ANALYZE` reveals the root cause.

```
                                                                        QUERY PLAN
----------------------------------------------------------------------------------------------------------------------------------------------------------
 HashAggregate  (cost=1803.56..5051720.36 rows=1472 width=105) (actual time=77.844..21448.249 rows=1472 loops=1)
   Group Key: elements.sku
   ->  Hash Left Join  (cost=455.32..1623.24 rows=72128 width=105) (actual time=8.832..40.214 rows=72128 loops=1)
         Hash Cond: ((elements.sku)::text = (elements_shippings.element_sku)::text)
         ->  Hash Right Join  (cost=137.48..468.20 rows=10304 width=105) (actual time=3.121..11.922 rows=10304 loops=1)
               Hash Cond: ((elements_prices.element_sku)::text = (elements.sku)::text)
               ->  Seq Scan on elements_prices  (cost=0.00..189.04 rows=10304 width=11) (actual time=0.005..2.439 rows=10304 loops=1)
               ->  Hash  (cost=119.08..119.08 rows=1472 width=105) (actual time=3.100..3.100 rows=1472 loops=1)
                     Buckets: 2048  Batches: 1  Memory Usage: 225kB
                     ->  Hash Left Join  (cost=46.12..119.08 rows=1472 width=105) (actual time=0.866..2.270 rows=1472 loops=1)
                           Hash Cond: ((elements.sku)::text = (elements_inventories.element_sku)::text)
                           ->  Seq Scan on elements  (cost=0.00..52.72 rows=1472 width=105) (actual time=0.006..0.441 rows=1472 loops=1)
                           ->  Hash  (cost=27.72..27.72 rows=1472 width=11) (actual time=0.843..0.843 rows=1472 loops=1)
                                 Buckets: 2048  Batches: 1  Memory Usage: 78kB
                                 ->  Seq Scan on elements_inventories  (cost=0.00..27.72 rows=1472 width=11) (actual time=0.006..0.420 rows=1472 loops=1)
         ->  Hash  (cost=189.04..189.04 rows=10304 width=11) (actual time=5.639..5.639 rows=10304 loops=1)
               Buckets: 16384  Batches: 1  Memory Usage: 562kB
               ->  Seq Scan on elements_shippings  (cost=0.00..189.04 rows=10304 width=11) (actual time=0.005..2.722 rows=10304 loops=1)
   SubPlan 1
     ->  Seq Scan on elements_prices elements_prices_1  (cost=0.00..240.56 rows=1 width=4) (actual time=0.511..1.023 rows=1 loops=1472)
           Filter: (((element_sku)::text = (elements.sku)::text) AND ((country_code)::text = 'fr'::text))
           Rows Removed by Filter: 10303
   SubPlan 2
     ->  Seq Scan on elements_prices elements_prices_2  (cost=0.00..240.56 rows=1 width=4) (actual time=0.506..1.010 rows=1 loops=1472)
           Filter: (((element_sku)::text = (elements.sku)::text) AND ((country_code)::text = 'fr'::text))
           Rows Removed by Filter: 10303
   SubPlan 3
     ->  Seq Scan on elements_prices elements_prices_3  (cost=0.00..240.56 rows=1 width=4) (actual time=0.507..1.013 rows=1 loops=1472)
           Filter: (((element_sku)::text = (elements.sku)::text) AND ((country_code)::text = 'fr'::text))
           Rows Removed by Filter: 10303
   SubPlan 4
     ->  Seq Scan on elements_prices elements_prices_4  (cost=0.00..240.56 rows=1 width=4) (actual time=0.507..1.016 rows=1 loops=1472)
           Filter: (((element_sku)::text = (elements.sku)::text) AND ((country_code)::text = 'fr'::text))
           Rows Removed by Filter: 10303
   SubPlan 5
     ->  Seq Scan on elements_prices elements_prices_5  (cost=0.00..240.56 rows=1 width=4) (actual time=0.506..1.013 rows=1 loops=1472)
           Filter: (((element_sku)::text = (elements.sku)::text) AND ((country_code)::text = 'fr'::text))
           Rows Removed by Filter: 10303
   SubPlan 6
     ->  Seq Scan on elements_prices elements_prices_6  (cost=0.00..240.56 rows=1 width=4) (actual time=0.508..1.013 rows=1 loops=1472)
           Filter: (((element_sku)::text = (elements.sku)::text) AND ((country_code)::text = 'fr'::text))
           Rows Removed by Filter: 10303
   SubPlan 7
     ->  Seq Scan on elements_prices elements_prices_7  (cost=0.00..240.56 rows=1 width=4) (actual time=0.507..1.012 rows=1 loops=1472)
           Filter: (((element_sku)::text = (elements.sku)::text) AND ((country_code)::text = 'fr'::text))
           Rows Removed by Filter: 10303
   SubPlan 8
     ->  Seq Scan on elements_shippings elements_shippings_1  (cost=0.00..240.56 rows=1 width=4) (actual time=0.510..1.018 rows=1 loops=1472)
           Filter: (((element_sku)::text = (elements.sku)::text) AND ((country_code)::text = 'fr'::text))
           Rows Removed by Filter: 10303
   SubPlan 9
     ->  Seq Scan on elements_shippings elements_shippings_2  (cost=0.00..240.56 rows=1 width=4) (actual time=0.507..1.013 rows=1 loops=1472)
           Filter: (((element_sku)::text = (elements.sku)::text) AND ((country_code)::text = 'fr'::text))
           Rows Removed by Filter: 10303
   SubPlan 10
     ->  Seq Scan on elements_shippings elements_shippings_3  (cost=0.00..240.56 rows=1 width=4) (actual time=0.508..1.013 rows=1 loops=1472)
           Filter: (((element_sku)::text = (elements.sku)::text) AND ((country_code)::text = 'fr'::text))
           Rows Removed by Filter: 10303
   SubPlan 11
     ->  Seq Scan on elements_shippings elements_shippings_4  (cost=0.00..240.56 rows=1 width=4) (actual time=0.508..1.012 rows=1 loops=1472)
           Filter: (((element_sku)::text = (elements.sku)::text) AND ((country_code)::text = 'fr'::text))
           Rows Removed by Filter: 10303
   SubPlan 12
     ->  Seq Scan on elements_shippings elements_shippings_5  (cost=0.00..240.56 rows=1 width=4) (actual time=0.509..1.016 rows=1 loops=1472)
           Filter: (((element_sku)::text = (elements.sku)::text) AND ((country_code)::text = 'fr'::text))
           Rows Removed by Filter: 10303
   SubPlan 13
     ->  Seq Scan on elements_shippings elements_shippings_6  (cost=0.00..240.56 rows=1 width=4) (actual time=0.507..1.011 rows=1 loops=1472)
           Filter: (((element_sku)::text = (elements.sku)::text) AND ((country_code)::text = 'fr'::text))
           Rows Removed by Filter: 10303
   SubPlan 14
     ->  Seq Scan on elements_shippings elements_shippings_7  (cost=0.00..240.56 rows=1 width=4) (actual time=0.511..1.017 rows=1 loops=1472)
           Filter: (((element_sku)::text = (elements.sku)::text) AND ((country_code)::text = 'fr'::text))
           Rows Removed by Filter: 10303
   SubPlan 15
     ->  Seq Scan on elements_inventories elements_inventories_1  (cost=0.00..31.40 rows=1 width=4) (actual time=0.080..0.156 rows=1 loops=1472)
           Filter: ((element_sku)::text = (elements.sku)::text)
           Rows Removed by Filter: 1471
   SubPlan 16
     ->  Seq Scan on elements_inventories elements_inventories_2  (cost=0.00..31.40 rows=1 width=4) (actual time=0.075..0.149 rows=1 loops=1472)
           Filter: ((element_sku)::text = (elements.sku)::text)
           Rows Removed by Filter: 1471
 Planning time: 1.417 ms
 Execution time: 21448.996 ms
(84 rows)

```

We can notice that 16 sub queries are run for every of the 1472 row of the table elements. 23536 sub queries consume most of the running part of this query.

#### Solution


```sql
  left join ( select element_sku, price from elements_prices where elements_prices.country_code = 'fr')
    as pfr on elements.sku = pfr.element_sku
```

All of the necessary fields can be retrieved through a `JOIN` returning the same result 24 times faster.

#### Conclusion

- Avoid to use sub query in the `SELECT` part of the query.
- Don't be afraid to use a `JOIN` and to structure your data in separated tables.
- Use `EXPLAIN ANALYZE` on complex queries.
